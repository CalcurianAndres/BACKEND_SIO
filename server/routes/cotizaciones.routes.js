const express = require('express');
const app = express();
const Escala = require('../database/models/escala.model');
const Producto = require('../database/models/producto.model')
const consultaDolar = require('consulta-dolar-venezuela');
const { pyDolarVenezuela } = require("consulta-dolar-venezuela");
const Despacho = require('../database/models/despacho.model');
const Orden = require('../database/models/orden.model');
const icotizacion = require('../database/models/icotizacion.model')


app.post('/api/cotizacion/intervalo', (req, res)=>{
    
    const body = req.body
    
    let Nueva_Escala = new Escala({
        producto:body.producto,
        cantidad:body.cantidad,
        descripcion:body.descripcion,
        montaje:body.montaje,
        escalas:body.escalas,
        precio:body.precio,
        cliente:body.cliente
    }).save((err, EscalaDB)=>{
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json(EscalaDB)
    })

})

app.get('/api/cotizacion/intervalo-todos/:cliente', (req, res)=>{
    let cliente = req.params.cliente;

    Escala.find({cliente})
        .populate('producto')
        .sort('escalas.cantidad')
        .exec((err, Escalas)=>{
        if( err ){
            return res.status(400).json({
                ok:false,
                err
                });
        }

        res.json(Escalas)
    })

})

app.get('/api/cotizacion/intervalo/:producto', (req, res)=>{
    let producto = req.params.producto;

    Escala.find({producto})
        .populate('producto')
        .exec((err, Escalas)=>{
        if( err ){
            return res.status(400).json({
                ok:false,
                err
                });
        }

        res.json(Escalas)
    })

})

app.delete('/api/cotizacion/intervalo/:id', (req, res)=>{
    let id = req.params.id

    Escala.findByIdAndDelete(id, (err, Escala)=>{
        if( err ){
            return res.status(400).json({
                ok:false,
                err
                });
        }

        res.json(Escala)
    })
})

app.put('/api/cotizacion/intervalos', (req, res)=>{
    let id = req.body._id
    let body = req.body

    //console.log(body)

    Escala.findOneAndUpdate({_id:id}, body,(err, Escala)=>{
        if( err ){
            return res.status(400).json({
                ok:false,
                err
                });
        }

        //console.log(Escala)
        res.json(Escala)

    })
})

app.post('/api/cotizacion/intervalo/producto/:producto', (req, res)=>{
    let producto = req.params.producto
    let cantidad = req.body.cantidad;
    let MonitorBCV
    
    
    
    Producto.findOne({producto}, (err, Producto)=>{
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        
        Escala.find({producto:Producto._id,cantidad:{$lte: cantidad} }, (err, Escala)=>{
            if( err ){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }

            //console.log(Escala)
            
            
            consultaDolar.$monitor().then($=>{

                if(!$){
                    //console.log('err')
                }
                
                MonitorBCV = $['$bcv']
                res.json({Escala,MonitorBCV})
            }, error =>{
                //console.log('mensaje de prueba')
                // MonitorBCV = 0,00
                res.json({Escala,MonitorBCV})
            })

        })
    })
})

app.put('/api/facturado', (req, res)=>{
    let body = req.body
    Despacho.findOne({"despacho._id":body._id}, (err, DespachoDB)=>{

        for(let i=0;i<DespachoDB.despacho.length;i++){
            let id = DespachoDB._id

            if(DespachoDB.despacho[i]._id == body._id){

                let itemIndex = i
                DespachoDB.despacho[i].documento = body.documento

                Despacho.findOneAndUpdate({_id:DespachoDB._id}, DespachoDB, (err, DespachoDBS)=>{
                    //console.log(DespachoDBS)
                })
            }
        }
    })
})

app.post('/api/incremento/pre', (req, res)=>{
    
    let body = req.body


    Despacho.findOne({"despacho._id":body._id}, (err, DespachoDB)=>{

        for(let i=0;i<DespachoDB.despacho.length;i++){
            let id = DespachoDB._id

            if(DespachoDB.despacho[i]._id == body._id){

                if(DespachoDB.despacho[i].documento[0] === 'N'){
                    DespachoDB.despacho[i].status = 'NE'
                    body.status = 'fac';
                    delete body._id
                    DespachoDB.despacho.push(body)
                    Despacho.findOneAndUpdate({_id:DespachoDB._id}, DespachoDB, (err, DespachoDBS)=>{
                    })
                }else{
                    let itemIndex = i
                    DespachoDB.despacho[i].tasa = body.tasa
                    DespachoDB.despacho[i].precio = body.precio
                    DespachoDB.despacho[i].escala = body.escala
                    DespachoDB.despacho[i].cantidad = body.cantidad
    
                    Despacho.findOneAndUpdate({_id:DespachoDB._id}, DespachoDB, (err, DespachoDBS)=>{
                        
                    })
                }

            }
        }
    })
    icotizacion.findByIdAndUpdate({_id: 'iterator'}, {$inc: {seq: 1}}, {new: true, upset:true})
                .exec((err, devolucion)=>{
                    if( err ){
                        return res.status(400).json({
                            ok:false,
                            err
                        });
                    }

                    res.json(devolucion.seq);
                })
})


app.get('/api/despachos/pre-facturacion', (req,res)=>{


    let preFacuracion = [];

    Despacho.find({
        $and: [
            { $or: [{ estado: 'pendiente' }, { 'despacho.documento': /^N/ }] },
            { fecha: { $not: /2023/ } }
          ]
    }, (err, despachos)=>{
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        //console.log(despachos)

        for(let i=0;i<despachos.length;i++){

            for(let x=0;x<despachos[i].despacho.length;x++){

                // //console.log(despachos[i].despacho[x].op)
                Orden.findOne({sort:despachos[i].despacho[x].op})
                .populate('cliente')
                .populate('producto.grupo')
                .populate('producto.cliente')
                .populate('producto.materiales')
                .populate({path:'producto', populate:{path:'materiales.producto'}})
                .populate({path:'producto.materiales.producto', populate:{path:'grupo'}})
                    .exec((err, ordensDB)=>{
                    if( err ){
                        return res.status(400).json({
                            ok:false,
                            err
                        });
                    }

                    Producto.findOne({producto:ordensDB.producto.producto, version:ordensDB.producto.version, edicion:ordensDB.producto.edicion})
                        .exec((err, ProductoDB)=>{
                            if( err ){
                                return res.status(400).json({
                                    ok:false,
                                    err
                                });
                            }

                            Escala.findOne({producto:ProductoDB._id})
                                .exec((err, EscalaDB)=>{
                                    if( err ){
                                        return res.status(400).json({
                                            ok:false,
                                            err
                                        });
                                    }
                                    preFacuracion.push({fecha:despachos[i].fecha,despacho:despachos[i].despacho[x], orden:ordensDB, escala:EscalaDB})
                                    if(i === despachos.length-1 && x === despachos[i].despacho.length-1){
                                        

                                        const pyDolar = new pyDolarVenezuela('bcv');
                                        
                                        pyDolar.getMonitor("USD").then($ =>{
                                            console.log($)
                                            res.json({preFacuracion,MonitorBCV:$.price})
                                        }).catch(error=> {
                                            res.json({preFacuracion,MonitorBCV:0.00})
                                        });
                                        // consultaDolar.getMonitor("BCV", "price").then($ =>{
                                        
                                        // });

                                        // consultaDolar.$monitor().then($=>{
                
                                        //     MonitorBCV = $['$bcv']
                                        // })
                                    }
                                })
                        })
                    
                })
            }


        }


    })
})

module.exports = app;
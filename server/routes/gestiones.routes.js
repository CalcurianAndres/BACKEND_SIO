const express = require('express');
const app = express();

var moment = require('moment'); // require

const Gestion = require('../database/models/gestiones.model');
const Trabajo = require('../database/models/trabajos.model');


app.post('/api/gestiones', (req,res)=>{
    const body = req.body;

    const NuevaGestion = new Gestion({
        op:body.op,
        fecha:body.fecha,
        hojas:body.hojas,
        maquina:body.maquina,
        orden:body.orden,
        productos:body.productos,
        Rproductos:body.Rproductos,
        Rhojas:body.Rhojas
    });

    NuevaGestion.save((err, gestionDB)=>{
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        Trabajo.findOne({_id:body.orden}, (err, trabajo)=>{
            if( err ){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }

            let hoy = moment().format('yyyy-MM-DD')
            if(trabajo.fechaI != hoy){
                var time = moment(trabajo.fechaI).diff(moment(),'days')+1

                if(time > 0){
                    Trabajo.findByIdAndUpdate(body.orden, {fechaI:hoy}, (err, trabajoEdited)=>{
                        if( err ){
                            return res.status(400).json({
                                ok:false,
                                err
                            });
                        }
                    })
                }
            }
            res.json(gestionDB);
        })


    })
});

app.get('/api/gestiones', (req, res)=>{


    // --CONSULTA A LA COLECCION DE GRUPOS--
    Gestion.find()
            .populate('maquina trabajos')
            .exec((err, gestionDB)=>{

        // --EN CASO DE ERROR--
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        // --MOSRAR LOS GRUPOS--
        res.json(gestionDB)

    })

});

app.get('/api/gestiones/:id', (req, res)=>{

    let op = req.params.id

    // --CONSULTA A LA COLECCION DE GRUPOS--
    Gestion.find({op})
            .populate('maquina trabajos')
            .exec((err, gestionDB)=>{

        // --EN CASO DE ERROR--
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        // --MOSRAR LOS GRUPOS--
        res.json(gestionDB)

    })

});

app.post('/api/many-gestiones', (req, res)=>{
    let body = req.body 

    for(let i=0;i<body.length;i++){
        let data = {
            fecha:body[i].fecha,
            productos:Number(body[i].productos),
            hojas:Number(body[i].hojas),
            Rproductos:Number(body[i].Rproductos),
            Rhojas:Number(body[i].Rhojas),
        }

        Gestion.findByIdAndUpdate(body[i]._id, data, (err, GestionEdited)=>{
            if( err ){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
        })
    
        if(i === body.length -1){
            res.json('ok')
        }
    }

})


module.exports = app;
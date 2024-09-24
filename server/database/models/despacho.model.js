const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let DespachoSchema = new Schema(
    {   
        estado:{
            type:String,
            default:'pendiente'
        },
        fecha:{
            type:String
        },
        observacion:{
            type:String
        },
        despacho:[{
            parcial:{
                type:String,
            },
            op:{
                type:String
            },
            producto:{
                type:String
            },
            cantidad:{
                type:Number
            },
            oc:{
                type:String
            },
            destino:{
                type:String
            },
            certificado:{
                type:String,
                default:''
            },
            documento:{
                type:String,
                default:''
            },
            tasa:{
                type:Number,
            },
            escala:{
                type:Number,
            },
            precio:{
                type:Number,
            },
            fecha_prefacturacion:{
                type:String
            },
            status:{
                type:String,
                default:'despacho'
            }
        }]
    }
);

module.exports = mongoose.model('despacho', DespachoSchema)
            
            // op:select.sort,
            // producto:select.producto.producto,
            // cantidad:select.cantidad_o,
            // oc:select.orden,
            // destino:select.almacen
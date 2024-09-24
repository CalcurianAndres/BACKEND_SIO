const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let DevolucionSchema = new Schema([{

    orden:{
        type:String
    },
    filtrado:[
        {
            material:{
                type:Schema.Types.ObjectId,
                ref: 'material'
            },
            lote:{
                type:String
            },
            codigo:{
                type:String
            },
            cantidad:{
                type:Number
            }
        }
    ]
    ,
    motivo:{
        type:String
    },
    fecha:{
        type:Date,
        default:Date.now
    },
    usuario:{
        type:String
    },
    status:{
        type:String,
        default:'Pendiente'
    }

}]);


module.exports = mongoose.model('devolucion', DevolucionSchema)
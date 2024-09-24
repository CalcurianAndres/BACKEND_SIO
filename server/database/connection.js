const mongoose = require('mongoose');
const Counter = require('../database/models/orden.model');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex:true,
    useUnifiedTopology: true
}, (err, res)=>{
    if( err ) throw err;

    console.log('Base de datos ONLINE to ', process.env.DB_URL)
});

module.exports = mongoose;
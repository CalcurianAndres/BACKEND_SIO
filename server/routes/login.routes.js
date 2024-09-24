const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../database/models/usuarios.model');
const { verificarToken, verificarToken2 } = require('../auth/autenticacion');

const app = express();

app.get('/api/renew', verificarToken, (req,res)=>{

    let token = jwt.sign({
        usuario:req.usuario
    }, process.env.SEED, {expiresIn:process.env.EXP});

    

    res.json({
        ok:true,
        usuario:req.usuario,
        token,
    });
})

app.get('/api/renew2', verificarToken2, (req,res)=>{

    let token_two = jwt.sign({
        usuario:req.usuario
    }, process.env.SEED, {expiresIn:120});

    

    res.json({
        ok:true,
        usuario:req.usuario,
        token_two,
    });
})

app.post('/api/validation2steps', (req,res)=>{
    let body = req.body;

    Usuario.findOne({Correo:body.correo}, (err, usuarioDB)=>{
        if ( err ){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        //console.log(usuarioDB.pin)
        if(!bcrypt.compareSync( body.pin, usuarioDB.pin )){
            // //console.log(usuarioDB.TSV,'/',body.pin)
            return res.status(400).json({
                ok:false,
                err:{
                    message:'PIN INVALIDO'
                }
            });
        }

        let token_two = jwt.sign({
            pin:usuarioDB.pin
        }, process.env.SEED, {expiresIn:120});

        res.json({
            ok:true,
            usuario:usuarioDB,
            token_two
        });


    })
})

app.post('/api/crear-pin', (req,res)=>{
    let body = req.body
    body.pin = bcrypt.hashSync(body.pin, 10)

    Usuario.findOneAndUpdate({Correo:body.correo}, {pin:body.pin}, (err, usuarioDB)=>{
        if ( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            usuario:usuarioDB
        });
    })
    
})

app.post('/api/login', (req,res)=>{

    let body = req.body;
    // ////console.log(body)

    Usuario.findOne({Correo:body.Correo}, (err, usuarioDB)=>{
        if ( err ){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        // ////console.log(usuarioDB)

        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Usuario o contraseña incorrectos'
                }
            });
        }

        if( !bcrypt.compareSync( body.Password, usuarioDB.Password )){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Usuario o contraseña incorrectos'
                }
            });
        }
        
        let token = jwt.sign({
            usuario:usuarioDB
        }, process.env.SEED, {expiresIn:process.env.EXP});

        res.json({
            ok:true,
            usuario:usuarioDB,
            token
        });
    });

});

module.exports = app;
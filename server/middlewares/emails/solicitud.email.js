const nodemailer = require('nodemailer');
const {header6,header2, footer} = require('../templates/template.email');
let {tituloCorreo} = require('../templates/template.email')

function NuevaSolicitud_(orden,correo,motivo,num_solicitud,adjunto,tabla){
    var transporter = nodemailer.createTransport({
        host: "mail.poligraficaindustrial.com",
        port: 2525,
        secure: false,
        auth: {
            user: 'sio.soporte@poligraficaindustrial.com',
            pass: 'P0l1ndc@'
        },
        tls: {
            rejectUnauthorized: false
        },
        maxConnections: 5,
        maxMessages: 10,
        rateDelta: 1000, // 1000 ms delay between sending emails
        rateLimit: true
    });


    let titulo = `<h1>Hola Equipo!</h1>`
    var mailOptions = {
        from: '"SIO - Sistema Integral de Operacion" <sio.soporte@poligraficaindustrial.com>',
        to: correo,
        subject: `Solicitud de Material`,
        attachments: [{
            filename: `AL-SOL-${num_solicitud}_${orden}.pdf`,
            content:adjunto
        }],
        html:`${header6(titulo)}
        <br>
               Se ha realizado una nueva solicitud de material 
               <br>
               <style>
               table, th, td {
               border: 1px solid black;
               border-collapse: collapse;
               }
               </style>
              <table align="center" border=".5" cellpading="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                   <tr>
                       <th>Material</th>
                       <th>Cantidad</th>
                   </tr>
                   ${tabla}
               </table><br>
    <b>Motivo:</b>${motivo}<br>
    Dirígete al sistema SIO para asignar lo lotes.

            ${footer}`
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
           console.log(err);
        }else{
            //// //console.log(info);
        }
    });
}

function NuevaSolicitud(orden,correo,motivo,num_solicitud,adjunto,tabla){
    var transporter = nodemailer.createTransport({
        host: "mail.poligraficaindustrial.com",
        port: 2525,
        secure: false,
        auth: {
            user: 'sio.soporte@poligraficaindustrial.com',
            pass: 'P0l1ndc@'
        },
        tls: {
            rejectUnauthorized: false
        },
        maxConnections: 5,
        maxMessages: 10,
        rateDelta: 1000, // 1000 ms delay between sending emails
        rateLimit: true
    });


    let titulo = `<h1>Hola Equipo!</h1>`
    var mailOptions = {
        from: '"SIO - Sistema Integral de Operacion" <sio.soporte@poligraficaindustrial.com>',
        to: correo,
        subject: `Solicitud de Material`,
        attachments: [{
            filename: `AL-SOL-${num_solicitud}_${orden}.pdf`,
            content:adjunto
        }],
        html:`${header6(titulo)}
        <br>
               Se ha realizado una nueva solicitud de material asociada a la Orden de Producción:
               <br>
               <h1 align="center">Nº ${orden}</h1>
               <br>
               <style>
                table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
                }
                </style>
               <table align="center" border=".5" cellpading="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                    <tr>
                        <th>Material</th>
                        <th>Cantidad</th>
                    </tr>
                    ${tabla}
                </table> <br>
    <b>Motivo:</b>${motivo}<br>
    Dirígete al sistema SIO para asignar lo lotes.

            ${footer}`
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err);
        }else{
            //// //console.log(info);
        }
    });


}

function NuevaSolicitud__(orden,correo,motivo,num_solicitud,adjunto,tabla){
    var transporter = nodemailer.createTransport({
        host: "mail.poligraficaindustrial.com",
        port: 2525,
        secure: false,
        auth: {
            user: 'sio.soporte@poligraficaindustrial.com',
            pass: 'P0l1ndc@'
        },
        tls: {
            rejectUnauthorized: false
        },
        maxConnections: 5,
        maxMessages: 10,
        rateDelta: 1000, // 1000 ms delay between sending emails
        rateLimit: true
    });


    let titulo = `<h1>Hola Equipo!</h1>`
    var mailOptions = {
        from: '"SIO - Sistema Integral de Operacion" <sio.soporte@poligraficaindustrial.com>',
        to: correo,
        subject: `Solicitud de Material`,
        attachments: [{
            filename: `AL-SOL-${num_solicitud}_${orden}.pdf`,
            content:adjunto
        }],
        html:`${header6(titulo)}
        <br>
               Se ha realizado una nueva solicitud de material 
               <br>
               <style>
               table, th, td {
               border: 1px solid black;
               border-collapse: collapse;
               }
               </style>
              <table align="center" border=".5" cellpading="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                   <tr>
                       <th>Material</th>
                       <th>Cantidad</th>
                   </tr>
                   ${tabla}
               </table><br>
    <b>Motivo:</b>${motivo}<br>
    Dirígete al sistema SIO para asignar lo lotes.

            ${footer}`
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
           console.log(err);
        }else{
            //// //console.log(info);
        }
    });
}



module.exports = {
    NuevaSolicitud,
    NuevaSolicitud_
}

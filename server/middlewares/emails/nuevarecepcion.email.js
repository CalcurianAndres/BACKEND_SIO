const nodemailer = require('nodemailer');
const {header__, footer} = require('../templates/template.email')

function reception(orden,correo,motivo,random){
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
        subject: `Recepción de material - F/NE:${random}`,
        html:`${header__('Recepción de material',titulo)}
        <br>
               Se encuentra disponible para su verificación el siguiente material asociado 
               <br> a la factura / Nota de entrega  N° ${random}
               <br> <br>
               <style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
                <table align="center" border="1" cellpading="0" cellspacing="0" width="600">
                    <tr>
                        <th>Material</th>
                        <th>Lote</th>
                        <th>Cantidad</th>
                    </tr>
                    ${motivo}
                </table>
               <br>

    <br><br>
    Dirígete al sistema SIO para su verificación.

            ${footer}`
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err);
        }else{
            // //console.log(info);
        }
    });


}

function reception_(orden,correo,random,info){
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


    let titulo = `<h1>Hola Yraida!</h1>`
    var mailOptions = {
        from: '"SIO - Sistema Integral de Operacion" <sio.soporte@poligraficaindustrial.com>',
        to: correo,
        subject: `Error en la carga de recepción de material - F/NE:${random}`,
        html:`${header__('Recepción de material',titulo)}
        <br>
               ${info}
               <br>
               
               <style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
    <br><br>
    Dirígete al sistema SIO para corroborar la información.

            ${footer}`
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err);
        }else{
            // //console.log(info);
        }
    });


}

function reception__(orden,correo,motivo,random){
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
        subject: `Recepción de material - F/NE:${random}`,
        html:`${header__('Recepción de material',titulo)}
        <br>
               Se encuentra disponible para su verificación el siguiente material asociado 
               <br> a la factura / Nota de entrega  N° ${random}
               <br> <br>
               <style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
                <table align="center" border=".5" cellpading="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                    <tr>
                        <th>Material</th>
                        <th>Lote</th>
                        <th>Cantidad</th>
                    </tr>
                    ${motivo}
                </table>
               <br>

    <br><br>
    Dirígete al sistema SIO y almacen de producto en observación para su verificación.

            ${footer}`
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            
            console.log(err);
        }else{
            // //console.log(info);
        }
    });


}


function reception___(orden,correo,motivo,random,tabla){
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
    let mensaje;
    if(orden === 'APROBADO'){
        mensaje = `Ya se encuentra etiquetado y disponible para su ubicación definitiva en el almacén.`
    }else{
        mensaje = `<b>Laboratorio de calidad:</b> Proceder a levantar la no conformidad.`
    }   

    var mailOptions = {
        from: '"SIO - Sistema Integral de Operacion" <sio.soporte@poligraficaindustrial.com>',
        to: correo,
        subject: `Resultados de análisis lote: ${random}`,
        html:`${header__('Recepción de material',titulo)}
        <br>
               Se ha completado el análisis del siguiente material: <br>
               <br> <br>
               <style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
                <table align="center" border=".5" cellpading="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                    <tr>
                        <th>Material</th>
                        <th>Lote</th>
                        <th>Cantidad</th>
                        <th>Resultado</th>
                    </tr>
                    ${tabla}
                </table>
               <br>
    El cual presenta la siguiente observación:<br>
    ${motivo}
    <br><br>
    ${mensaje}

            ${footer}`
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err);
        }else{
            // //console.log(info);
        }
    });


}

module.exports = {
    reception,
    reception_,
    reception__,
    reception___
}

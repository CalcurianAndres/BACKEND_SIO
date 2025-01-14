const nodemailer = require('nodemailer');
const {header, header4, footer} = require('../templates/template.email')

function _despacho_(lotes,fecha, correo,observacion){

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


    let titulo = `<h1>Hola Equipo,</h1>`
    var mailOptions = {
        from: '"SIO - Sistema Integral de Operacion" <sio.soporte@poligraficaindustrial.com>',
        to: correo,
        subject: `Nuevo Despacho`,
        html:`${header4(titulo)}
        <br>
               Sirva la presente para confirmar la entrega de los productos abajo descritos,
               <br>
               los mismos deben ser despachados en la fecha <b>${fecha}</b>
               <br><br>
               <style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
                <table align="center" border=".5" cellpading="5" cellspacing="0" width="600" style="border-collapse: collapse;">
                    <tr>
                    <th>OP</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>OC</th>
                    <th>Destino</th>
                    </tr>
                    ${lotes}
                </table>
            <br>
                ${observacion}
            <br><br>
            ¡Garanticemos la entrega oportuna!
            ${footer}`
    };
    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err);
        }else{
            return
        }
    });
}

function asignacion(orden, solicitud, lotes,adjunto,nombre,correo){

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


    let titulo = `<h1>Hola ${nombre},</h1>`
    var mailOptions = {
        from: '"SIO - Sistema Integral de Operacion" <sio.soporte@poligraficaindustrial.com>',
        to: correo,
        subject: `Nueva orden de producción`,
        attachments: [{
            filename: `AL-ASG-${solicitud}_${orden}.pdf`,
            content:adjunto
        }],
        html:`${header2(titulo)}
        <br>
               Se ha realizado la asignación de material relacionado con la orden de producción:
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
                    <th>Lotes</th>
                    <th>Cantidad</th>
                    </tr>
                    ${lotes}
                </table>
               Ya puedes dirigirte al almacen a retirar
            ${footer}`
    };
    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
           console.log(err);
        }else{
            return
        }
    });
}

module.exports = {
    asignacion,
    _despacho_
}

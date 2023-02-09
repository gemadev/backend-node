// require('dotenv').config({path: '../../.env'});

require('dotenv').config()

const nodemailer = require('nodemailer');
const { logger, loggerError } = require('../logs/winston');


const sendMailNewUserData = (nombre, email, age, adress, phone) => {
    try {
        const transporterGmail = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: process.env.GMAIL_ADRESS,
                pass: process.env.GMAIL_PWD,
            },
        });

        transporterGmail
            .sendMail({
                from: `Servidor app CoderHouse <${process.env.GMAIL_ADRESS}>`,
                to: process.env.GMAIL_ADRESS,
                subject: "Nuevo registro",
                html: `
                <h1 style="color:green;">Nuevo Usuario Registrado</h1>
                <h2 style="color:blue;">Datos:</h2>
                <p>Nombre: ${nombre}</p>
                <p>Email: ${email}</p>
                <p>Edad: ${age}</p>
                <p>Dirección: ${adress}</p>
                <p>Teléfono: ${phone}</p>
                `,
            })
            .then((result) => {
                logger.log("info","Nuevo usuario registrado. Email con datos enviado exitosamente");
            })
            .catch((error) => loggerError.log("error", error));
    } catch (error) {
        loggerError.log("Error en nodemailer al registrar un usuario", error);
    }
};

const sendMailUserOrder = (nombre, email, productos) => {
    try {
        const transporterGmail = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: process.env.GMAIL_ADRESS,
                pass: process.env.GMAIL_PWD,
            },
        });

        transporterGmail
            .sendMail({
                from: `Servidor app CoderHouse <${process.env.GMAIL_ADRESS}>`,
                to: process.env.GMAIL_ADRESS,
                subject: "Nueva compra",
                html: `
                <h1>Nuevo pedido de ${nombre}</h1>
                <h2>Datos:</h2>
                <h3>Email: ${email}</h3>
                <p>Productos JSON: ${productos}</p>
                `,
            })
            .then((result) => {
                logger.log("info","Lista de productos comprados. Email con datos enviado exitosamente")
            })
            .catch((error) => loggerError.log("error", error.message));
    } catch (error) {
        loggerError.log("Error en nodemailer al realizar una compra", error);
    }
};

module.exports = {
    sendMailNewUserData,
    sendMailUserOrder
};
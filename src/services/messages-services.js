
const { messageDao } = require("../Daos");
const { loggerError } = require("../logs/winston");

const mensajes = messageDao;


const norm = require('normalizr');

const getAllMessages = async (ctx) => {
    
    let contenido = await mensajes.getAll();
    let stringify = JSON.stringify(contenido)
    let parser = JSON.parse(stringify)
    const textSchema = new norm.schema.Entity('text', {idAttribute: "_id" });
    const schemaAuthor = new norm.schema.Entity('author',{ text: textSchema},{ idAttribute: 'email' });
    const schemaMessage = new norm.schema.Entity('message',{author: schemaAuthor},{idAttribute: "_id" } );
    const normalizado = norm.normalize(parser,[schemaMessage]);

    ctx.response.body = normalizado;
};

const getMessagesById = async (ctx) => {
    const id = ctx.request.params.id;
    const mensajePorId = await mensajes.getById(id);
    if (mensajePorId !== null) {
        ctx.response.status = 200;
        ctx.response.body = mensajePorId;
    } else {
        loggerError.log({
            level: "error",
            message: `Error Metodo: ${ctx.method} Mensaje ${id} no existe`,
        });
        ctx.response.status = 400;
        ctx.response.body = await mensajes.getAll();
    };
};


const deleteMessageById = async (ctx) => {
    const id = ctx.request.params.id;
    const mensajePorId = await mensajes.getById(id);
    if (mensajePorId !== null) {
        await mensajes.deleteById(id);
        ctx.response.status = 200;
        ctx.response.body = `Message ID: ${id} borrado`;
    }else {
        loggerError.log({
            level: "error",
            message: `Error Metodo: ${ctx.method} Mensaje ${id} no existe`,
        });
        ctx.response.status = 404;
        ctx.response.body = `ERROR Mensaje ID:${id} no encontrado`;
    }
};

const postNewMessage = async (ctx) => {
    const { nombre, apellido, edad, email, alias, avatar, text } = ctx.request.body;
    if (!nombre || !apellido || !edad || !email || !alias || !avatar || !text) {
        // return res.status(400).send("Faltan datos");
        ctx.response.status = 400;
        ctx.response.body = `Faltan datos`;
    } else {
        const mensaje = {
            author: {
                email: email,
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                alias: alias,
                avatar: avatar,
                fecha: new Date().toLocaleString(),
            },
            text: text,
        };
        await mensajes.save(mensaje);
        ctx.response.status = 201;
        ctx.response.body = mensaje;
    }
};


module.exports = {
    getAllMessages,
    getMessagesById,
    deleteMessageById,
    postNewMessage
};
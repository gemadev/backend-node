
const { messageDao } = require("../Daos");
const { loggerError } = require("../logs/winston");

const mensajes = messageDao;


const norm = require('normalizr');

const getAllMessages = async (req, res) => {
    // res.status(200).send(await mensajes.getAll());

    let contenido = await mensajes.getAll();
    let stringify = JSON.stringify(contenido)
    let parser = JSON.parse(stringify)
    const textSchema = new norm.schema.Entity('text', {idAttribute: "_id" });
    const schemaAuthor = new norm.schema.Entity('author',{ text: textSchema},{ idAttribute: 'email' });
    const schemaMessage = new norm.schema.Entity('message',{author: schemaAuthor},{idAttribute: "_id" } );
    const normalizado = norm.normalize(parser,[schemaMessage]);
    res.status(200).send(normalizado)
};

const getMessagesById = async (req, res) => {
    const id = req.params.id;
    const mensajePorId = await mensajes.getById(id);
    if (mensajePorId !== null) return res.status(200).send(mensajePorId);
    else {
        loggerError.log({
            level: "error",
            message: `Error Metodo: ${req.method} Mensaje ${id} no existe`,
        });
        return res.status(404).send(await mensajes.getAll());
    }
};

const deleteMessageById = async (req, res) => {
    const id = req.params.id;
    const mensajePorId = await mensajes.getById(id);
    if (mensajePorId !== null) {
        await mensajes.deleteById(id);
        return res.status(201).send(`Message ID: ${id} borrado`);
    } else {
        loggerError.log({
            level: "error",
            message: `Error Metodo: ${req.method} Mensaje ${id} no existe`,
        });
        return res.status(404).json(`ERROR Mensaje ID:${id} no encontrado`);
    }
};

const postNewMessage = async (req, res) => {
    const { nombre, apellido, edad, email, alias, avatar, text } = req.body;
    if (!nombre || !apellido || !edad || !email || !alias || !avatar || !text) {
        return res.status(400).send("Faltan datos");
    }
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
    res.status(201).send(mensaje);
};

module.exports = {
    getAllMessages,
    getMessagesById,
    deleteMessageById,
    postNewMessage
};
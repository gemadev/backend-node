
const Router = require('koa-router');
const routerMensajes = new Router({
    prefix: '/api/mensajes'
});


const {
    getAllMessages,
    getMessagesById,
    deleteMessageById,
    postNewMessage,
} = require("../../services/messages-services");


routerMensajes.get("/", getAllMessages);

routerMensajes.get("/:userId", getMessagesById);

routerMensajes.post("/", postNewMessage);

routerMensajes.delete("/:id", deleteMessageById);


module.exports = routerMensajes;
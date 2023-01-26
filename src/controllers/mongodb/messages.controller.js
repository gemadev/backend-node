
const Router = require("express").Router;
const routerMensajes = Router();

const { isAuth } = require("../../middlewares/permisos");

const {
    getAllMessages,
    getMessagesById,
    deleteMessageById,
    postNewMessage,
} = require("../../services/messages-services");


routerMensajes.get("/api/mensajes/", isAuth, getAllMessages);

routerMensajes
    .route("/api/mensajes/:id?")
    .get( isAuth, getMessagesById)
    .delete(  isAuth, deleteMessageById);

routerMensajes.post("/api/mensajes", isAuth, postNewMessage);

module.exports = routerMensajes;

const Router = require("express").Router;
const routerMensajes = Router();

const { isAuth } = require("../../middlewares/permisos");

const {
    getAllMessages,
    getMessagesById,
    deleteMessageById,
    postNewMessage,
} = require("../../services/messages-services");


routerMensajes.get("/mensajes/", isAuth, getAllMessages);

routerMensajes
    .route("/:id?")
    .get( isAuth, getMessagesById)
    .delete(  isAuth, deleteMessageById);

routerMensajes.post("/", isAuth, postNewMessage);

module.exports = routerMensajes;
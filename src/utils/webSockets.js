
const ContenedorMensajes = require("../containers/fyle/contenedorMensajes");

const { logger } = require("../logs/winston.js");

const mensajes = new ContenedorMensajes("./src/DB/mensajes.json");

const { productsDao } = require("../daos");
const productos = productsDao


// const {allNormalizeProcess} = require("../controllers/normalizr");

const scocketMsjAndProd =  (ioServer) => {
    ioServer.on("connection", async (socket) => {
        logger.log("info", `Nuevo usuario conectado`);

        socket.emit("messages", await mensajes.getAll());

        socket.on("new-message", async (msj) => {
            await mensajes.save(msj);
            await mensajes.getAll(),
            ioServer.sockets.emit(
                    "messages",
                    await mensajes.getAll()
                );
        });

        socket.emit("productos", await productos.getAll());

        socket.on("agregarProducto", async (producto) => {
            await productos.save(producto);
            ioServer.sockets.emit("productos", await productos.getAll());
        });
    });
};

module.exports = {scocketMsjAndProd};
const Router = require('koa-router');

const apiRouter = new Router();

const routerProductos = require("../controllers/mongodb/products.controller");
const routerCarritos = require("../controllers/mongodb/cart.controller");
const routerMensajes = require("../controllers/mongodb/messages.controller");
const routerUser = require("../controllers/mongodb/user.controller");


apiRouter.use( routerProductos.routes());
apiRouter.use( routerCarritos.routes());
apiRouter.use( routerMensajes.routes());
apiRouter.use( routerUser.routes());

module.exports = apiRouter;
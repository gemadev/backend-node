const { Router } = require("express");
const routerProductos = require("../controllers/mongodb/products.controller");
const routerCarritos = require("../controllers/mongodb/cart.controller");
const routerMensajes = require("../controllers/mongodb/messages.controller");
const routerUser = require("../controllers/mongodb/user.controller");
const routerViews = require("../controllers/views.controller");
routerMensajes
const apiRouter = Router();

apiRouter.use('/api/productos', routerProductos);
apiRouter.use('/api/carrito', routerCarritos);
apiRouter.use('/api/mensajes', routerMensajes);
apiRouter.use('/', routerUser);
apiRouter.use('/', routerViews);

module.exports = apiRouter;
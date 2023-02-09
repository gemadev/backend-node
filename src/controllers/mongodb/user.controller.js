const Router = require("express").Router;
const routerUser = Router();

const { isAuth } = require("../../middlewares/permisos");

const {
    getUser,
    getUserData,
    getUserCart,
    getUserOrder,
} = require("../../services/user-services");


routerUser.get('/user', isAuth, getUser);

routerUser.get('/user/data', isAuth, getUserData);

routerUser.get('/user/carrito', isAuth, getUserCart);

routerUser.get('/user/order', isAuth, getUserOrder);

module.exports = routerUser;
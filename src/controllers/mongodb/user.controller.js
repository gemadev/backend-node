const Router = require('koa-router');
const routerUser = new Router({
    prefix: '/user',
});


const {
    getUser,
    getUserCart,
    getUserOrder,
    getAllUsers,
    postCreateUser,
    deleteUserById
} = require("../../services/user-services");


routerUser.get('/', getAllUsers)

routerUser.post('/', postCreateUser)

routerUser.get('/:userId',  getUser);

routerUser.delete('/:userId', deleteUserById);

routerUser.get('/:userId/carrito',  getUserCart);

routerUser.get('/:userId/order',  getUserOrder);


module.exports = routerUser;
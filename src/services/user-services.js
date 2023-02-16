const { userDao, cartDao } = require("../daos");

const mongoose = require('mongoose');
const UsuarioSchema = require("../config/models/UsuarioSchema");
const bcrypt = require('bcrypt');


const { sendMailUserOrder } = require("../utils/nodemailer");

const User = mongoose.model('usuarios', UsuarioSchema);

const getAllUsers = async (ctx) => {
    const users = await userDao.getAll();
    ctx.response.status = 200;
    ctx.response.body = users;
};

const postCreateUser = async (ctx) => {
    const { nombre, email, password, age, phone, adress } = ctx.request.body;
    const usuario = await User.findOne({ email: email });
    if (usuario) {
        ctx.response.status = 404;
        ctx.response.body = { message: 'Usuario con email ya existe' }
    } else {

        const userCart = await cartDao.createCarrito()
        const newUser = User();
        const { nombre, email, password, age, phone, adress, thumbnail } = ctx.request.body; //campos por formulario
        newUser.email = email;
        newUser.cart = userCart;
        newUser.nombre = nombre;
        newUser.age = age;
        newUser.phone = phone;
        newUser.adress = adress;
        newUser.email = email;
        newUser.password = bcrypt.hashSync(password, 10);
        newUser.thumbnail = thumbnail;

        if (ctx.request.file === undefined) {
            newUser.thumbnail = "public/assets/img/users/anonimus.jpg";
        } else {
            let newPath = (ctx.file.path).replace("public/", '');
            newUser.thumbnail = newPath;
        }
        const user = await newUser.save();
        ctx.response.status = 201;
        ctx.response.body = user;
    }
};

const deleteUserById = async (ctx) => {
    const userId = ctx.request.params.userId;
    const userData = await userDao.getById(userId);
    if (!userData) {
        ctx.response.status = 404;
        ctx.response.body = 'User not found';
        return;
    } else {
        const user = await userDao.deleteById(userId);
        ctx.response.status = 200;
        ctx.response.body = `User with id ${userId} successfully deleted`;
    }
};

const getUser = async (ctx) => {
    const userId = ctx.request.params.userId;
    const userData = await userDao.getById(userId);
    if (userData !== null) {
        ctx.response.status = 200;
        ctx.response.body = userData;
    } else {
        ctx.response.status = 404;
        ctx.response.body = `User with id ${userId} not found`;
    }
};

const getUserCart = async (ctx) => {
    const userId = ctx.request.params.userId;
    const user = await userDao.getById(userId);
    if (user !==null) {
        const userCart = await cartDao.getById(user.cart[0])
        ctx.response.status = 200;
        ctx.response.body = userCart;
    } else {
        ctx.response.status = 404;
        ctx.response.body = `User with id ${userId} not found`;
    }
};

const getUserOrder = async (ctx) => {
    const userId = ctx.request.params.userId;
    const user = await userDao.getById(userId);
    if (user !==null) {
        const userName = user.nombre;
        const userEmail = user.email;
        const userCart = JSON.stringify(user.cart[0]);

        // sendMailUserOrder(userName, userEmail, userCartstring) // send Order to Server app

        // await cartDao.deleteAllProductsInCart(user.cart[0]) // delete all products in cart

        const prodsInCart = await cartDao.getById(user.cart[0])

        ctx.response.status = 200;
        ctx.response.body = ` Compra de Usuario: ${userName} \nEmail: ${userEmail} \nCart ID: ${userCart}  \nProductos: ${JSON.stringify(prodsInCart)}`;
    }
};

module.exports = {
    getUser,
    getUserCart,
    getUserOrder,
    getAllUsers,
    postCreateUser,
    deleteUserById
};
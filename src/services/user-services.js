const { userDao, cartDao } = require("../daos");
const { sendMailUserOrder } = require("../utils/nodemailer");


const getUser = async (req, res) => {
    const {user} = req.session.passport;
    const data = await userDao.getByEmail(user);
    const userData = await userDao.getById(data[0]._id)
    const string = JSON.stringify(userData);
    const parseado = JSON.parse(string)
    const userAvatar = userData.thumbnail.split('public')[1];
    res.render('user', {title: "Perfil", parseado,  userAvatar: userAvatar})
};

const getUserData = async (req, res) => {
    const {user} = req.session.passport;
    const data = await userDao.getByEmail(user);
    const userData = await userDao.getById(data[0]._id)
    const string = JSON.stringify(userData);
    const parseado = JSON.parse(string)
    res.status(200).send(parseado)
};

const getUserCart = async (req, res) => {
    const {user} = req.session.passport;
    const data = await userDao.getByEmail(user);
    const userCart = await cartDao.getById(data[0].cart[0])
    const string = JSON.stringify(userCart)
    const cartParseado = JSON.parse(string)
    res.render('userCart', {title: "Carrito", userCart: cartParseado})
}

const getUserOrder = async (req, res) => {
    const {user} = req.session.passport;
    const data = await userDao.getByEmail(user);
    const userCart = await cartDao.getById(data[0].cart[0])
    const userName = data[0].nombre;
    const userEmail = data[0].email;
    const userCartstring = JSON.stringify(userCart)

    // sendMailUserOrder(userName, userEmail, userCartstring) // send Order to Server app

    cartDao.deleteAllProductsInCart(data[0].cart[0])

    res.render('userOrder', {user:user})
};

module.exports = {
    getUser,
    getUserData,
    getUserCart,
    getUserOrder
};
const { userDao, cartDao } = require("../daos");


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

module.exports = {
    getUser,
    getUserData,
    getUserCart
};
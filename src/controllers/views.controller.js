const Router = require('express').Router;
const passport = require('../routes/passport-local');
const routesHBS = require('../services/views-services')
const uploadFile = require('../middlewares/multer');

const routerViews = Router();

// ROOT - HOME
routerViews.get("/", routesHBS.getRoot);
routerViews.get("/home", routesHBS.getHome);

// SIGNUP
routerViews.
    route("/signup")
        .get(routesHBS.getSignup)
        .post(uploadFile(), passport.authenticate("signup", {successRedirect:"/login", failureRedirect:"/failsignup"})); //multer
;
routerViews.get("/failsignup", routesHBS.getFailSignup);

//  LOGIN
routerViews.
    route("/login")
        .get(routesHBS.getLogin)
        .post(passport.authenticate("login", {successRedirect:"/home", failureRedirect:"/faillogin"}), routesHBS.postLogin);
;
routerViews.get('/faillogin', routesHBS.getFailLogin);

// LOGOUT
routerViews.get("/logout", routesHBS.isItLogged, routesHBS.getLogout);
// routerViews.get("/getuser", routesHBS.isItLogged, routesHBS.getUser); //sin uso por HBS


module.exports = routerViews;
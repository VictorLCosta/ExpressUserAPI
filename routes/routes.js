var express = require('express');
var app = express();
var router = express.Router();
var HomeController = require('../controllers/HomeController');
var UsersController = require('../controllers/UsersController');
var AdminAuth = require("../middlewares/AdminAuth")

router.get('/users', HomeController.index);
router.post('/users', UsersController.create);
router.get('/users/:id', AdminAuth, UsersController.findUser);
router.put("/users/edit", AdminAuth, UsersController.edit);
router.put("/users/delete/:id", AdminAuth, UsersController.delete);
router.post("/users/recover", UsersController.recoverPassword);
router.post("/users/change-password", UsersController.changePassword);
router.post("/login", UsersController.login);

module.exports = router;
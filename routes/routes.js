var express = require('express');
var app = express();
var router = express.Router();
var HomeController = require('../controllers/HomeController');
var UsersController = require('../controllers/UsersController');

router.get('/users', HomeController.index);
router.post('/users', UsersController.create);
router.get('/users/:id', UsersController.findUser);
router.put("/users/edit", UsersController.edit);
router.put("/users/delete/:id", UsersController.delete);

module.exports = router;
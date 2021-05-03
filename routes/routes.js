var express = require('express');
var app = express();
var router = express.Router();
var HomeController = require('../controllers/HomeController');
var UsersController = require('../controllers/UsersController')

router.get('/users', HomeController.index);
router.post('/users', UsersController.create);
router.get('/users/:id', UsersController.findUser)

module.exports = router;
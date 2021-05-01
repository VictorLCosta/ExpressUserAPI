var express = require('express');
var app = express();
var router = express.Router();
var HomeController = require('../controllers/HomeController');
var UsersController = require('../controllers/UsersController')

router.get('/', HomeController.index);
router.post('/users', UsersController.create);

module.exports = router;
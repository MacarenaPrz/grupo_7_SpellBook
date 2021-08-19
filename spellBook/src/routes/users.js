var express = require('express');
var router = express.Router();
const controller = require('../controllers/usersController');


// GET users listing
router.get('/', controller.login);
// Registro 
router.get('/signup', controller.signup);
// Info de Usuario 
router.get('/register', controller.register);

module.exports = router
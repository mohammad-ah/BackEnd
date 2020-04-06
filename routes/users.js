var express = require('express');
var router = express.Router();
const userController = require('../controller/user');

/* GET users listing. */
router.post('/user-register', userController.signUp);

module.exports = router;

var express = require('express');
var router = express.Router();
var postController = require('../controller/post');

router.post('/create-post', postController.createPost);

module.exports = router;

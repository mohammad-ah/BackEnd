var express = require('express');
var router = express.Router();
var postController = require('../controller/post');

const multer = require('multer');

var DIR = '../public/';
var upload = multer({dest: DIR}).single('image');

router.post('/create-post', postController.createPost);
router.post('/remove', postController.removePost);
router.get('/search/:id&:search&:skip&:limit', postController.searchPosts);

module.exports = router;

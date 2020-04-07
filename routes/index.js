var express = require('express');
var router = express.Router();
var postController = require('../controller/post')

/* GET home page. */
router.get('/get-posts/:id&:skip&:limit', postController.getFollowingPosts);

module.exports = router;

var express = require('express');
var router = express.Router();
var postController = require('../controller/post')
const jwt = require('express-jwt');
const auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

/* GET home page. */
router.get('/get-posts/:id&:skip&:limit', postController.getFollowingPosts);

module.exports = router;

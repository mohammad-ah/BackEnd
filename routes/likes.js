var express = require('express');
var router = express.Router();
var likeController = require('../controller/like');

router.post('/like', likeController.likePost);
router.post('/dislike', likeController.dislikePost);

module.exports = router;

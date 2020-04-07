var express = require('express');
var router = express.Router();
var commentController = require('../controller/comment');

router.post('/create-comment', commentController.createComment);
router.post('/delete-comment', commentController.deleteComment);

module.exports = router;

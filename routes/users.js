var express = require('express');
var router = express.Router();
const userController = require('../controller/user');

/* GET users listing. */
router.post('/user-register', userController.signUp);
router.post('/follow', userController.followUser);
router.post('/unfollow', userController.unfollowUser);
router.get('/following/:id', userController.followingList);
router.post('/disable-notifications', userController.disableNotifications);
router.post('/enable-notifications', userController.enableNotifications);

module.exports = router;

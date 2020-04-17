var express = require('express');
var router = express.Router();
const userController = require('../controller/user');
const jwt = require('express-jwt');
const auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

/* GET users listing. */
router.post('/user-register', userController.signUp);
router.post('/login', userController.login);
router.post('/follow', userController.followUser);
router.post('/unfollow', userController.unfollowUser);
router.get('/following/:id', userController.followingList);
router.post('/disable-notifications', userController.disableNotifications);
router.post('/enable-notifications', userController.enableNotifications);
router.post('/request-activation', userController.requestActivation);
router.post('/list', userController.listUsers);
router.get('/:id/followings', userController.userFollowings);

module.exports = router;

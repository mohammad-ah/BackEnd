var express = require('express');
var router = express.Router();
var notificationsController = require('../controller/notification');

router.post('/read/:id/:userId', notificationsController.readNotification);
router.get('/get/:userId', notificationsController.getNotificationsForUser);

module.exports = router;

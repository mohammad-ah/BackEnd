var express = require('express');
var router = express.Router();
const adminController = require('../controller/admin');

/* Push ad. */
router.post('/pushAd', adminController.pushAd);

module.exports = router;
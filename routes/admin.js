var express = require('express');
var router = express.Router();
const adminController = require('../controller/admin');

/* Push ad. */
router.post('/pushAd', adminController.pushAd);
/* Add a filter. */
router.post('/addFilter', adminController.addFilter);
/* Get filters. */
router.get('/filtered', adminController.getFiltered);
/* Get Unhealthy Posts. */
router.get('/unhealthy-post', adminController.getUnhealthy);
/* Get Unhealthy Posts. */
router.post('/disable-unhealthy', adminController.disableHealthy);

module.exports = router;
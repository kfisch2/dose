const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const twilioRoutes = require('./twilio-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/twilio', twilioRoutes);

module.exports = router;

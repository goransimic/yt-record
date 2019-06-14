const router = require('express').Router();
const videoRoutes = require('./video.route');

router.use('/video', videoRoutes);

module.exports = router;

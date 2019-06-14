const router = require('express').Router();
const { check } = require('express-validator/check');

const { validate } = require('../helpers');
const videoController = require('../controllers');

router.post(
  '/fetch',
  [check('url').exists({ checkNull: true, checkFalsy: true })],
  validate,
  videoController.fetch
);

router.post(
  '/process',
  [
    check('id').exists({ checkNull: true, checkFalsy: true }),
    check('startTime')
      .isNumeric()
      .toFloat()
      .custom((value, { req }) => value < req.body.endTime),
    check('endTime')
      .isNumeric()
      .toFloat()
      .custom((value, { req }) => value > req.body.startTime),
    check('removeSilence')
      .isBoolean()
      .toBoolean({ strict: true }),
    check('normalizeVolume')
      .isBoolean()
      .toBoolean({ strict: true }),
    check('audioBitrate')
      .isNumeric()
      .isIn([96, 128, 192])
      .toInt()
  ],
  validate,
  videoController.process
);

module.exports = router;

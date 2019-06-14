const { videoService } = require('../services');

const fetch = async (req, res, next) => {
  try {
    const video = await videoService.fetch(req.body);
    return res.send({ ...video });
  } catch (err) {
    return next(err);
  }
};

const process = async (req, res, next) => {
  try {
    const stream = await videoService.process(req.body);
    return stream.pipe(res);
  } catch (err) {
    return next(err);
  }
};

const videoController = {
  fetch,
  process
};

module.exports = videoController;

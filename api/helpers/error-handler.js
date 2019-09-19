// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  return res
    .status(err.status || 500)
    .send({ message: err.message, error: process.env.NODE_ENV === 'development' ? err.stack : {} });
};

module.exports = errorHandler;

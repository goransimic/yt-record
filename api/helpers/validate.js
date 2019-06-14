const { validationResult } = require('express-validator/check');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).send({ message: 'Validation failed.', error: errors.array() });
  next();
};

module.exports = validate;

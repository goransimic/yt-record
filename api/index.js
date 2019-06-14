const paths = require('../config/paths');
require('../config/env')(process.env.ENVIRONMENT);

const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const routes = require('./routes');
const { errorHandler } = require('./helpers');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(paths.appDist));
  app.get('*', function(req, res) {
    res.sendFile(paths.appIndexHtml);
  });
}

app.listen(process.env.PORT || 4000, error => {
  if (error) console.log(`Error: ${error}`);
  console.log(`Server listening on port: ${process.env.PORT || 4000}`);
});

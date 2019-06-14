const fs = require('fs');

const paths = require('./paths');

module.exports = function(environment) {
  const dotenvFiles = [
    environment && `${paths.dotenv}.${environment}.local`,
    environment && `${paths.dotenv}.${environment}`,
    `${paths.dotenv}.local`,
    paths.dotenv
  ].filter(Boolean);

  dotenvFiles.forEach(
    dotenvFile => fs.existsSync(dotenvFile) && require('dotenv').config({ path: dotenvFile })
  );
};

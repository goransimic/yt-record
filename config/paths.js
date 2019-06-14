const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appSrc: resolveApp('src'),
  appDist: resolveApp('dist'),
  appPublic: resolveApp('public'),
  appIndexHtml: resolveApp('src/index.html'),
  appIndexJs: resolveApp('src/index.js')
};

module.exports = {
  extends: [
    'standard',
    'standard-react',
    'plugin:prettier/recommended',
    'prettier/standard',
    'prettier/react'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 10
  },
  env: {
    browser: true,
    es6: true,
    node: true
  }
};

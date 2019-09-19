module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 10
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react'
  ],
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  rules: {
    'no-console': 'off'
  }
};

module.exports = {
  extends: '@shcherbin/eslint-config/node',
  overrides: [{
    files: 'services/*/src/handlers/*.js',
    rules: {
      'import/prefer-default-export': 'off'
    }
  }],
  env: {
    jest: true
  }
}

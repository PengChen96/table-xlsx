// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    'comma-style': [2, 'last'],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi': 2,
    'space-infix-ops': 2
  }
};

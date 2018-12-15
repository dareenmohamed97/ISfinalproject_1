module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true,
    mocha: true,
    es6: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/strongly-recommended', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'eslint:recommended'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-dupe-keys': 0,
    'no-console': 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': 0,
    quotes: ['error', 'single'],
    // semi: ['error', 'always'],
    'no-unused-vars': [
      'off',
      {
        'varsIgnorePattern': 'should|expect'
      }
    ],
    'no-useless-escape': 0
  }
};

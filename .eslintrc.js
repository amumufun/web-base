module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['plugin:vue/base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/extensions': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'warn',
    'no-unused-vars': 'warn',
    'no-restricted-syntax': 'off',
    semi: ['warn', 'always'],
    quotes: ['warn', 'single'],
    'comma-dangle': 'warn',
    'arrow-parens': ['warn', 'always'],
    'max-len': 'off',
    'no-useless-escape': 'off',
    'no-continue': 'off',
    'no-labels': 'off',
    'no-plusplus': 'off',
    'for-direction': 'off',
    'prefer-destructuring': 'off',
    'func-names': 'off',
    'linebreak-style': 'off',
    'no-trailing-spaces': 'warn',
    'object-curly-newline': 'off'
  }
};

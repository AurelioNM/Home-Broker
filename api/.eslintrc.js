module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-useless-constructor': 'off',
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-plusplus': 'off',
    'no-await-in-loop': 'off',
    camelcase: 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '_',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    'no-shadow': 'off',
    'consistent-return': 'off',
    'dot-notation': 'off',
    'no-restricted-syntax': 'off',
    'array-callback-return': 'off',
    'no-useless-return': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};

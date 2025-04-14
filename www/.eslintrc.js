const { resolve } = require('node:path');

const project = resolve(__dirname, 'jsconfig.json');

module.exports = {
  root: true,
  plugins: ['unused-imports'],
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    // --- Custom rules ---
    'unused-imports/no-unused-imports': 'error',
    'no-console': 'off',
    'no-useless-catch': 'off',
    'no-empty-pattern': 'off',

    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-shadow': [
      'error',
      {
        ignoreOnInitialization: true,
      },
    ],
    'import/newline-after-import': 'error',

    'unicorn/filename-case': 'off',

    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
      },
    ],

    // --- Deactivated rules ---
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/require-await': 'off',

    'import/no-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/order': 'off',

    'no-nested-ternary': 'off',
    'no-redeclare': 'off',

    'react/jsx-fragments': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off', // Optional with React 17+
    'react/jsx-uses-react': 'off',     // Optional with React 17+
    '@next/next/no-img-element': 'off',
  },
};

module.exports = {
  'env': {
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 13,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [
      'warn',
      2
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'semi': [
      'warn',
      'always'
    ],
    'react/prop-types': [
      'off'
    ],
    'react/jsx-max-props-per-line': [
      'warn',
      {
        'maximum': 1,
        'when': 'multiline'
      }
    ],
    'react/jsx-indent-props': [
      'warn',
      2
    ],
    'react/jsx-first-prop-new-line': [
      'warn',
      'multiline'
    ],
    'react/jsx-closing-bracket-location': [
      'warn',
      'tag-aligned'
    ]
  }
};

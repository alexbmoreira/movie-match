module.exports = {
  'env': {
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'settings': {
    'react': {
      'pragma': 'React',
      'version': '17.0.1'
    }
  },
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
    'object-curly-spacing': [
      'warn',
      'always'
    ],
    'no-multiple-empty-lines': [
      'warn',
      {
        'max': 1,
        'maxEOF': 0,
        'maxBOF': 0
      }
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

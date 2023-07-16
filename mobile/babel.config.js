module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: 'react-native-dotenv'
      }],
      ['module-resolver', {
        root: ['./src'],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ]
      }],
      'react-native-reanimated/plugin'
    ]
  };
};

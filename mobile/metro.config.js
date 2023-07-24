module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        inlineRequires: true,
      },
    }),
    sourceMaps: true, // Enable source maps for both Android and iOS
  },
};

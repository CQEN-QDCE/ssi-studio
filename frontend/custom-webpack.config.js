module.exports = {
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      fs: false,
      stream: "stream-browserify",
      process: 'process/browser'
    },
  },
};
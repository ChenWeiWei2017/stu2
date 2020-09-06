module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-px2rem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}

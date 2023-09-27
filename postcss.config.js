module.exports = {
  plugins: {
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    'postcss-flexbugs-fixes': {},
    'postcss-mixins': {
      mixinsDir: require('path').join(__dirname, 'src/app/style/mixins'),
    },
    'postcss-simple-vars': {},
    'postcss-nested': {},
    'postcss-each': {},
    // cssnano: {},
  },
};

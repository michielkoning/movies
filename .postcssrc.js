module.exports = {
  plugins: {
    'postcss-preset-env': {
      importFrom: ['./src/styles/mixins/media-queries.css'],

      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-query-ranges': true,
      },
    },
  },
};

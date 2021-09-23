module.exports = {
  pwa: {
    name: 'Films',
    appleMobileWebAppCapable: 'yes',
    manifestOptions: {
      description: 'Mijn favoriete films',
      lang: 'nl',
    },
    workboxOptions: {
      exclude: ["netlify.toml"],
    },
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('svg-sprite-loader')
      .loader('svgo-loader')
      .loader('svg-sprite-loader');
  },
};

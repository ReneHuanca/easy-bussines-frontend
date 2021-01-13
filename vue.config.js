module.exports = {

  // to production
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-cli-admin/'
    : '/',

  // ESLint Active
  lintOnSave: false,

  devServer: {
    disableHostCheck: true,
  },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}

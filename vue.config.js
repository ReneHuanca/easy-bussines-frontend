module.exports = {

  // to local
  // publicPath: '',

  // to production in github
  publicPath: process.env.NODE_ENV === 'production'
    ? '/easy-bussines-frontend/'  // rpository name
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

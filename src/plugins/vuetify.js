import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import i18n from '@/i18n'
import '@/sass/overrides.sass'

Vue.use(Vuetify)

const theme = {
  primary: '#453a94 ',
  secondary: '#9C27b0',
  accent: '#9C27b0',
  info: '#00CAE3',
}
// background-image: linear-gradient(to top, #f43b47 0%, #453a94 100%);
export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
})

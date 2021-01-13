import Vue from 'vue'
import Vuex from 'vuex'
import dashboard from './dashboard.module'
import { auth } from './auth.module'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,

    welcomeDialog: true,
    sessionExpiredModal: false,
  },

  mutations: {
      SET_BAR_IMAGE (state, payload) {
          state.barImage = payload
      },
      SET_DRAWER (state, payload) {
          state.drawer = payload
      },
      SET_WELCOME_DIALOG (state, payload) {
          state.welcomeDialog = payload
      },
      SET_SESSION_EXPIRED_MODAL (state, payload) {
        state.sessionExpiredModal = payload
      }
  },

  modules: {
    // dashboard,
    auth
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    auth: false
  },
  mutations: {
    setAuth: function (state) {
      console.log('setAuth')
      state.auth = true
    },
    resetAuth: function (state) {
      console.log('resetAuth')
      state.auth = false
    }
  }
});

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
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

export default store
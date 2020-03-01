import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test: 'virker!',
    dato: Date.now(),
    dato2: new Date()
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    home: true,
    ranking: false,
    tournaments: false,
    players: [],
    challenges: [],
    csChallenges: [],
    csPlayers: [],
    loading: true
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

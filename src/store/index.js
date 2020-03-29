import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //strict:true,
  state: {
    home: true,
    ranking: false,
    tournaments: false,
    players: [],
    challenges: [],
    csChallenges: [],
    csPlayers: [],
    loading: true,
    valgtTurnering: null
  },
  mutations: {
    updateValgtTurnering(state, payload) {
      state.valgtTurnering = payload;
      console.log("mutate")
      console.log(this.state.valgtTurnering)
      console.log(payload);
    }
  },
  actions: {
  },
  modules: {
  }
})

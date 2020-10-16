import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    turn: null,
    position: null,
    winner: null,
    home: null,
    draw: false,
  },
  mutations: {
    SOCKET_USER_CONNECTED: (state, payload) => {
      state.players = payload
    },
    SOCKET_SEND_TURN: (state, payload) => {
      state.turn = payload
    },
    SOCKET_SEND_POSITION: (state, payload) => {
      state.position = payload
    },
    SOCKET_SEND_WINNER: (state, payload) => {
      state.winner = payload
    },
    SOCKET_SEND_HOME: (state, payload) => {
      state.home = payload
    },
    SOCKET_SEND_DRAW: (state, payload) => {
      state.draw = payload
    },
    RESET_GAME: (state, payload) => {
      state.players = []
      state.turn = null
      state.position = null
      state.winner = null
      state.home = null
      state.draw = false
    }
  },
  actions: {
  },
  modules: {
  }
})

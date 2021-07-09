import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    turn: 1,
    activeAs: '',
    player1: { nama: 'player 1', score: 0, socketId: '' },
    player2: { nama: 'player 2', score: 0 , socketId: '' },
    cardList: []
  },
  mutations: {
    SET_PLAYER_1 (state, payload) {
      state.player1 = payload
    },
    SET_PLAYER_2 (state, payload) {
      state.player2 = payload
    },
    ADD_PLAYER_1_SCORE (state, payload) {
      state.player1.score = payload
    },
    ADD_PLAYER_2_SCORE (state, payload) {
      state.player2.score = payload
    },
    RESET_STATE(state){
      state.player1 = { nama: '', score: 0 }
      state.player2 = { nama: '', score: 0 }
    },
    SET_ACTIVE_PLAYER(state, payload){
      state.activeAs = payload
    },
    SET_P1_NAME (state, payload) {
      state.player1.nama = payload
    },
    SET_P2_NAME (state, payload) {
      state.player2.nama = payload
    },
    SET_CARD(state, payload) {
      state.cardList = payload;
    },
    SET_TURN(state, payload) {
      state.turn = payload;
    },
    CHANGE_TURN(state) {
      if (state.turn == 1) {
        state.turn = 2
      } else {
        state.turn = 1
      }
    }
  },
  actions: {
    addScore1(context){
      let score = this.state.player1.score + 1
      context.commit('ADD_PLAYER_1_SCORE', score)
      this.dispatch('checkFinish')
    },
    addScore2(context){  
      let score = this.state.player2.score + 1
      context.commit('ADD_PLAYER_2_SCORE', score)
      this.dispatch('checkFinish')
    },
    checkFinish(){
      if (this.state.player1.score + this.state.player2.score >= 6) {
        let winner = ''; 

        if (this.state.player1.score > this.state.player2.score) {
          winner = 'THE WINNER IS PLAYER-1'
        } else if (this.state.player1.score < this.state.player2.score) {
          winner = 'THE WINNER IS PLAYER-2'
        } else {
          winner = 'DRAW'
        }

        Swal.fire({
          title: winner,
          text: "G A M E  O V E R",
          icon: 'warning',
          confirmButtonText: 'New Game'
        }).then((result) => {
          if (result.isConfirmed) {
            this.dispatch('resetState')
          }
        })
      }
    },
    resetState() {

    }
  },
  modules: {
  }
})

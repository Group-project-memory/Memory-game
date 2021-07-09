import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player1: { nama: 'player 1', score: 0 },
    player2: { nama: 'player 2', score: 0 },
    cardList: [
      {
        num: 1,
        id: "1b",
        img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204sa.jpg",
        discovered: false
      },
      {
          num: 2,
          id: "2b",
          img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204s2.jpg",
          discovered: false
      },
      {
          num: 3,
          id: "3b",
          img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204s3.jpg",
          discovered: false
      },
      {
          num: 4,
          id: "4b",
          img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204s4.jpg",
          discovered: false
      },
      {
          num: 5,
          id: "5b",
          img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204s5.jpg",
          discovered: false
      },
      {
          num: 6,
          id: "6b",
          img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204s6.jpg",
          discovered: false
      },
      {
          num: 1,
          id: "1r",
          img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204ha.jpg",
          discovered: false
      },
      {
          num: 2,
          id: "2r",
          img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204h2.jpg",
          discovered: false
      },
      {
          num: 3,
          id: "3r",
          img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204h3.jpg",
          discovered: false
      },
      {
          num: 4,
          id: "4r",
          img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204h4.jpg",
          discovered: false
      },
      {
          num: 5,
          id: "5r",
          img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204h5.jpg",
          discovered: false
      },
      {
          num: 6,
          id: "6r",
          img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204h6.jpg",
          discovered: false
      },
    ]
  },
  mutations: {
    ADD_PLAYER_1_SCORE (state, payload) {
      state.player1.score = payload
    },
    ADD_PLAYER_2_SCORE (state, payload) {
      state.player2.score = payload
    },
    RESET_STATE(state){
      state.player1 = { nama: '', score: 0 }
      state.player2 = { nama: '', score: 0 }
    }
  },
  actions: {
    addScore1(context){
      context.commit('ADD_PLAYER_1_SCORE', this.state.player1.score++)
      this.dispatch('checkFinish')
    },
    addScore2(context){  
      context.commit('ADD_PLAYER_2_SCORE', this.state.player2.score++)
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

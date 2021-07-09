<template>
  <div class="home">
    <div class="col-4 rounded p-4 mx-auto my-4" id="login-block" style="color: white; background-color: rgba(255, 150, 0, 0.2);">
      <h1 v-if="isWaiting" class="text-3xl font-bold text-center">Waiting another Lord</h1>
      <h1 v-if="!isWaiting" class="text-3xl font-bold text-center">May i know your name, My Lord</h1>
      <div v-if="!isWaiting" class="text-md font-bold text-center text-red-700" id="login-error">{{errMsg}}</div>
      <form v-if="!isWaiting" id="login-form" @submit.prevent="startGame">
        <div class="form-group">
          <input type="text" class="form-control" v-model="nama" aria-describedby="emailHelp" placeholder="Name">
        </div>
        <button type="submit" class="btn btn-primary">Start Journey</button>
      </form>
    </div>
<!-- 

    <button v-if="!isWaiting" @click="startGame">START GAME</button>
    <h1 v-if="isWaiting">Waiting Another Player</h1> -->
  </div>
</template>

<script>
import {io} from 'socket.io-client'
const socket = io('http://localhost:3000')

export default {
  name: 'Home',
  components: { },
  data() {
      return {
          idSocket: '',
          isWaiting: false,
          nama: ''
        }
  },
  methods: {
    startGame () {
      socket.emit('join_game', 'JOIN');

    }
  },
  mounted () {
    console.log('mounted')
    socket.on('connect', () => {
      console.log('disini')
    })

    socket.on('idSocket', (payload) => {
      this.idSocket = payload
    })

    socket.on('respon_join', payload => {
      if(payload === 'Player Full') {
        console.log('Silahkan Coba Lagi Setelah Beberapa Saat')
      } else {
        if (payload == 1) {
          console.log('Waiting Another Player')
          this.$store.commit('SET_ACTIVE_PLAYER', 'player1')
          this.$store.commit('SET_P1_NAME', this.nama)

          console.log('Your Are Player 1')
          this.isWaiting = true;
        } else {
          console.log('Game Started')

          if (this.$store.state.activeAs === '') {
            this.$store.commit('SET_ACTIVE_PLAYER', 'player2')
            this.$store.commit('SET_P2_NAME', this.nama)

            console.log('Your Are Player 2')

            socket.emit('player2', this.$store.state.player2)
            socket.emit('getCard')
          }
          this.$router.push('/game')
        }
      }
    })

    socket.on('s_getCard', payload => {
      this.$store.commit('SET_CARD', payload)
    })

    socket.on('s_player2', payload => {
      this.$store.commit('SET_PLAYER_2', payload)
    })
  }

}
</script>

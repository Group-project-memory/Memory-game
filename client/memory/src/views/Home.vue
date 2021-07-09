<template>
  <div class="home">
    <button v-if="!isWaiting" @click="startGame">START GAME</button>
    <h1 v-if="isWaiting">Waiting Another Player</h1>
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
          isWaiting: false
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

          console.log('Your Are Player 1')
          this.isWaiting = true;
        } else {
          console.log('Game Started')

          if (this.$store.state.activeAs === '') {
            this.$store.commit('SET_ACTIVE_PLAYER', 'player2')

            console.log('Your Are Player 2')
          }
          this.$router.push('/game')
        }
      }
    })
  }

}
</script>

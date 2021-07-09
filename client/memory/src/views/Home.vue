<template>
  <div class="home">
    <div class="col-4 rounded p-4 mx-auto my-4" id="login-block" style="color: white; background-color: rgba(255, 150, 0, 0.2);">
      <h1 class="text-3xl font-bold text-center">Enter Your Name!</h1>
      <div class="text-md font-bold text-center text-red-700" id="login-error">{{errMsg}}</div>
      <form id="login-form" @submit.prevent="startGame">
        <div class="form-group">
          <input type="text" class="form-control" v-model="nama" aria-describedby="emailHelp" placeholder="Name">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="room" placeholder="Room Number">
        </div> <br>
        <button type="submit" class="btn btn-primary">Enter!</button>
      </form>
    </div>
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
          isWaiting: false,
          nama: '',
          room: ''
        }
  },
  methods: {
    startGame () {
      socket.emit('join_game', this.nama);

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

    socket.on('respon_join', (playerCount, nama, p1name) => {
      if(playerCount === 'Player Full') {
        console.log('Silahkan Coba Lagi Setelah Beberapa Saat')
      } else {
        if (playerCount == 1) {
          console.log('Waiting Another Player')
          this.$store.commit('SET_ACTIVE_PLAYER', 'player1')
          console.log('Your Are Player 1')
          this.isWaiting = true;
        } else {
          console.log('Game Started')
          this.$store.commit('SET_P1_NAME', p1name )
          this.$store.commit('SET_P2_NAME', nama )
          socket.emit('getCard')
          if (this.$store.state.activeAs === '') {
            this.$store.commit('SET_ACTIVE_PLAYER', 'player2')
            console.log('Your Are Player 2')
          }
          this.$router.push('/game')
        }
      }
    })

    socket.on('s_getCard', payload => {
      console.log('setting cards')
      this.$store.commit('SET_CARD', payload)
    })
  }

}
</script>

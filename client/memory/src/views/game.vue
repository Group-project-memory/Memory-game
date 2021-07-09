<template>
    <div>
        <!-- <div class="d-flex justify-content-center h1">TEST</div><br> -->
        <!-- <div class="d-flex justify-content-center">
            <audio class="audio" controls autoplay>
                <source src="../assets/peritune-tavern.mp3" type="audio/mp3">
            </audio>
        </div> -->
        <div class="d-flex position-absolute w-100 justify-content-between">
            <Scoreboard :player="player1" :id="1"/>
            <Scoreboard :player="player2" :id="2"/>
        </div>
        <!-- <Sidebar :player1="player1" :player2="player2"/> -->
        <div class="memory-game" >
            <Card v-for="card in deck" 
            :key="card.id" 
            :card="card" 
            :flip="flip(card)" 
            @flipCard="flipCardClick"/>
        </div>
    </div>
</template>

<script>
import {io} from 'socket.io-client'
const socket = io('http://localhost:3000')

import Card from '../components/Card.vue'
// import Sidebar from '../components/Sidebar.vue'
import Scoreboard from '../components/Scoreboard.vue'

export default {
    components: {
        Card, Scoreboard
    },
    data() {
        return {
            element1 : null,
            element2 : null,
         }
    },
    computed: {
        deck () {
            return this.$store.state.cardList
        },
        player1 () {
            return this.$store.state.player1
        },
        player2 () {
            return this.$store.state.player2
        },
    },
    methods: {
        flip(item) {
            return  item.discovered || item === this.element1 || item === this.element2 || item.flip
        },
        flipCardClick(item) {
            item.flip = true
            socket.emit('flipCard', this.$store.state.cardList)
            this.flipCard(item)
        },
        flipCard(item) {
           if (!this.element1) {
               this.element1 = item;
           } else {
               if (!this.element2) {
                   this.element2 = item;
                   if (this.element1.num === this.element2.num){
                       this.element1.discovered = true;
                       this.element2.discovered = true;
                       
                       if (this.$store.state.turn == 1) {
                           this.$store.dispatch('addScore1')
                       } else {
                           this.$store.dispatch('addScore2')
                       }
                   } else {
                       console.log("SALA")
                       this.element1.flip = false;
                       this.element2.flip = false;
                    
                       this.$store.commit('CHANGE_TURN')
                       socket.emit('changeTurn', this.$store.state.turn)
                   }
               } else {
                   this.element1 = item,
                   this.element2 = null
               }
           }

           this.sendDataIO()
       },
       sendDataIO() {
            socket.emit('sendElement', {
               el1: this.element1,
               el2: this.element2,
               pl1: this.$store.state.player1,
               pl2: this.$store.state.player2,
           })
       }
    },
    created() {
        this.sendDataIO()
    },
    mounted () {
        socket.on('s_flipCard', payload => {
            console.log('CLIENT RECEIVE', payload)
            this.$store.commit('SET_CARD', null)
            this.$store.commit('SET_CARD', payload)
        })

        socket.on('s_changeTurn', payload => {
            this.$store.commit('SET_TURN', payload)
        })

        socket.on('s_sendElement', payload => {
            this.element1 = payload.el1
            this.element2 = payload.el2
            this.$store.commit('SET_PLAYER_1', payload.pl1)
            this.$store.commit('SET_PLAYER_2', payload.pl2)

            this.$store.dispatch('checkFinish')
            console.log('TERIMA ELEMENT', this.element1, this.element2)
        })
    }
}
</script>

<style>
.memory-game {
  width: 640px;
  height: 640px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  perspective: 1000px;
}
</style>
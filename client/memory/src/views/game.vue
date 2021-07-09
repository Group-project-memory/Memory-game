<template>
    <div>
        <div class="d-flex justify-content-center">
            <audio class="audio" controls autoplay>
                <source src="../assets/peritune-tavern.mp3" type="audio/mp3">
            </audio>
        </div>
        <div class="d-flex position-absolute w-100 justify-content-between">
            <Scoreboard :player="player1"/>
            <Scoreboard :player="player2"/>
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
                       
                       this.$store.dispatch('addScore1')
                   } else {
                       this.element1.flip = false;
                       this.element2.flip = false;
                   }
               } else {
                   this.element1 = item,
                   this.element2 = null
               }
           }
       }
    },
    created() {
    },
    mounted () {
        socket.on('s_flipCard', payload => {
            console.log('CLIENT RECEIVE', payload)
            this.$store.commit('SET_CARD', null)
            this.$store.commit('SET_CARD', payload)
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
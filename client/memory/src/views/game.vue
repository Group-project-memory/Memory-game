<template>
    <div>
        <!-- <div class="d-flex justify-content-center">
            <audio class="audio" controls autoplay>
                <source src="../assets/peritune-tavern.mp3" type="audio/mp3">
            </audio>
        </div> -->
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
            @flipCard="flipCard"/>
        </div>
    </div>
</template>

<script>
import Card from '../components/Card.vue'
// import Sidebar from '../components/Sidebar.vue'
import Scoreboard from '../components/Scoreboard.vue'
import lodash from 'lodash'
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
            return lodash.shuffle(this.$store.state.cardList)
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
            return item.discovered || item === this.element1 || item === this.element2
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
                   } 
               } else {
                   this.element1 = item,
                   this.element2 = null
               }
           }
       }
    },
    created() {
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
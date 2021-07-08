<template>
    <div>
        <Sidebar />
        <div class="memory-game">
            <Card v-for="card in deck" :key="card.id" :card="card"/>
        </div>
    </div>
</template>

<script>
import Card from '../components/Card.vue'
import Sidebar from '../components/Sidebar.vue'
import lodash from 'lodash'
export default {
    components: {
        Card, Sidebar
    },
    data() {
        return { }
    },
    computed: {
        deck () {
            return lodash.shuffle(this.$store.state.cardList)
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
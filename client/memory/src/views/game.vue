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
export default {
    data() {
        return {
            deck: [
                {
                    num: 1,
                    id: "1b",
                    img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204sa.jpg"
                },
                {
                    num: 2,
                    id: "2b",
                    img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204s2.jpg"
                },
                {
                    num: 3,
                    id: "3b",
                    img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204s3.jpg"
                },
                {
                    num: 4,
                    id: "4b",
                    img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204s4.jpg"
                },
                {
                    num: 5,
                    id: "5b",
                    img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204s5.jpg"
                },
                {
                    num: 6,
                    id: "6b",
                    img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204s6.jpg"
                },
                {
                    num: 1,
                    id: "1r",
                    img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204ha.jpg"
                },
                {
                    num: 2,
                    id: "2r",
                    img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204h2.jpg"
                },
                {
                    num: 3,
                    id: "3r",
                    img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204h3.jpg"
                },
                {
                    num: 4,
                    id: "4r",
                    img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204h4.jpg"
                },
                {
                    num: 5,
                    id: "5r",
                    img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204h5.jpg"
                },
                {
                    num: 6,
                    id: "6r",
                    img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204h6.jpg"
                },
            ]
        }
    },
    components: {
        Card, Sidebar
    },
    computed: {

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
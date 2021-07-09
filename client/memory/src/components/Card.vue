<template>
   <div :class="'memory-card ' + isFlip" @click="flipCard">
      <img class="front-face" :src="card.img" :alt="card.num" />
      <img class="back-face" src="https://playingcardcollector.files.wordpress.com/2013/03/d13204box2.jpg" alt="JS Badge" />
    </div>
</template>

<script>
export default {
    props: ["card", 'flip'],
    methods: {
        flipCard(){
          if (this.flip == 0) {
            this.flip = 1

            this.$emit("flipCard", this.card)
          }
        }
    },
    computed: {
        isFlip() {
            if (this.flip == 1) return "flip"
            else return ""
        } 
    }
}
</script>

<style>
.memory-card {
  width: calc(25% - 10px);
  height: calc(33.333% - 10px);
  margin: 5px;
  position: relative;
  transform: scale(1);
  transform-style: preserve-3d;
  transition: transform .5s;
}

.memory-card:active {
  transform: scale(0.97);
  transition: transform .2s;
}

.flip {
  transform: rotateY(180deg);
}

.front-face,
.back-face {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  margin: auto;
}

.front-face {
  transform: rotateY(180deg);
}
</style>
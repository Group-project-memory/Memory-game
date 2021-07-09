<template>
  <div class="w-25 scoreboard" >
    <img src="../assets/parchment.png" alt="parchment" style="width:100%;">
    <div class="centered">
        <div class="font-weight-bold h1">{{player.nama}}</div><br>
        <div class="font-weight-bold h1">{{player.score}}</div>
    </div>
 </div>
</template>

<script>
export default {
    props: ["player"]
}
</script>

<style>
.scoreboard {
  position: relative;
  text-align: center;
  color: black;
}

/* Centered text */
.name {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -100%);
  font-family: 'BlackRose';
}
.score {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  font-family: 'BlackRose';
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'BlackRose';
}
</style>
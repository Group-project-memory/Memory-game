<template>
  <div class="sidenav">
    <a href="#">PLAYER 1 NAME</a>
    <a href="#">PLAYER 1 SCORE : {{player1.score}}</a>
    <a href="#">PLAYER 2 NAME</a>
    <a href="#">PLAYER 2 SCORE</a>
</div>
</template>

<script>
export default {
  props: ['player1', 'player2'],
}
</script>

<style>

</style>
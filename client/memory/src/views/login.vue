<template>
  <div class="col-4 bg-light rounded p-4 mx-auto my-4" id="login-block">
      <h1 class="text-3xl font-bold text-center">Enter Your Name!</h1>
      <div class="text-md font-bold text-center text-red-700" id="login-error">{{errMsg}}</div>
      <form id="login-form" @submit.prevent="login">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" v-model="name" aria-describedby="emailHelp" placeholder="Name">
        </div>
        <div class="form-group">
          <label for="room">Room</label>
          <input type="text" class="form-control" v-model="room" placeholder="Room Number">
        </div> <br>
        <button type="submit" class="btn btn-primary">Enter!</button>
      </form>
    </div>
</template>

<script>
export default {
    models() {
        return {
            name: "",
            room: ""
        }
    }
}
</script>

<style>
#login-block {
    color: black
}
</style>
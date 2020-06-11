<template>
  <div class="navbar" id="nav">
    <router-link to="/">Home</router-link>|
    <router-link v-if="!isLoggedIn" to="/signup">signup</router-link>|
    <router-link v-if="!isLoggedIn" to="/login">login</router-link>|
    <router-link v-if="isLoggedIn" to="/logout">logout</router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["isLoggedIn"])
  }
};
</script>

<style>
</style>
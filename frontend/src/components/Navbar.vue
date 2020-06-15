<template>
  <div id="nav" class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 border-bottom shadow-sm">
    <router-link class="navbar-logo my-0 mr-md-auto font-weight-normal" to="/">Movie</router-link>
    <nav class="my-2 my-md-0 mr-md-3">
      <router-link class="p-2 text-light" v-if="!isLoggedIn" to="/login">Login</router-link>
      <router-link class="p-2 text-light" v-if="isLoggedIn" to="/logout">Logout</router-link>
    </nav>
    <router-link class="btn btn-danger text-light" v-if="!isLoggedIn" to="/signup">Sign up</router-link>
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

<style scoped>
#nav {
  background: black;
}

#nav a {
  text-decoration: none;
  font-weight: bold;
  color: #E50A13
}

#nav a.router-link-exact-active {
}
</style>
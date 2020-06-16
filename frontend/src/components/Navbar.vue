<template>
  <div
    id="nav"
    class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 shadow-sm"
  >
    <router-link
      class="navbar-logo my-0 mr-md-auto font-weight-normal"
      to="/"
      >Movie</router-link
    >
    <nav class="my-2 my-md-0 mr-md-3">
      <router-link
        class="p-2 text-light"
        v-if="!isLoggedIn"
        to="/login"
        >Login</router-link
      >
      <router-link
        class="p-2 text-light"
        v-if="isLoggedIn"
        to="/logout"
        >Logout</router-link
      >
    </nav>
    <router-link
      class="btn btn-danger text-light"
      v-if="!isLoggedIn"
      to="/signup"
      >Sign up</router-link
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
};
</script>

<style scoped>
#nav {
  -webkit-box-shadow: 0px -1px 25px 3px rgba(255, 255, 255, 0.1) !important;
  -moz-box-shadow: 0px -1px 25px 3px rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0px -1px 25px 3px rgba(255, 255, 255, 0.1) !important;
}

#nav a {
  text-decoration: none;
  font-weight: bold;
  color: #e50a13;
}

#nav a.router-link-exact-active {
}
</style>

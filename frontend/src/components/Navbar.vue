<template>
  <nav class="navbar navbar-expand-lg">
    <router-link class="navbar-brand my-0 mr-md-auto font-weight-bold" to="/">Movie</router-link>
    <button class="navbar-toggler toggler-example" type="button" data-toggle="collapse" data-target="#navbarNav"
    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span class="dark-white-text"><i
        class="fas fa-bars fa-1x"></i></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto d-flex justify-content-end align-items-center">
        <li v-if="this.$store.state.authToken">
          <span v-if="this.$store.state.user.avatar">
            <img class="user-avatar" :src="userAvatarURL" alt="avatar">
          </span>
          <span v-else>
            <i class="fas fa-user fa-2x"></i>
          </span>
        </li>
        <li class="nav-item mx-1 my-1">
          <router-link class="p-2 text-light" v-if="!isLoggedIn" to="/login">Login</router-link>
        </li>
        <li class="nav-item mx-1 my-1">
          <router-link class="p-2 text-light" v-if="isLoggedIn" to="/logout">Logout</router-link>
        </li>
        <li class="nav-item mx-1 my-1">
          <router-link class="btn btn-danger text-light" v-if="!isLoggedIn" to="/signup">Sign up</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import API from "../api/api.js";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["isLoggedIn"]),
    userAvatarURL() {
      return API.DB_BASE + this.$store.state.user.avatar.slice(1,)
    }
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
.navbar {
  background: black;
}
.navbar a {
  text-decoration: none;
  color: #e50a13
}

/* #nav a.router-link-exact-active {
} */
.fa-1x {
font-size: 1.5rem;
}
.navbar-toggler.toggler-example {
cursor: pointer;
}
.dark-white-text {
color: white;
}
.user-avatar {
  border-radius: 50%;
  height: 40px;
  background: white;
}
</style>

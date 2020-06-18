<template>
  <nav class="navbar navbar-expand-lg">
    <div>
      <router-link
        class="navbar-brand my-0 mr-md-auto font-weight-bold"
        to="/"
        >MEFLIX</router-link
      >
      <router-link
        class="p-2 text-light ml-3"
        to="/movies/all"
        >All Movie</router-link
      >
    </div>
    <button
      class="navbar-toggler toggler-example"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="dark-white-text"
        ><i class="fas fa-bars fa-1x"></i
      ></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul
        class="navbar-nav ml-auto d-flex justify-content-end align-items-center"
      >
        <li v-if="isLoggedIn">
          <span
            v-if="loginUser"
            class="d-flex align-items-center"
          >
            <img
              class="user-avatar"
              :src="userAvatarURL"
              alt="avatar"
            />{{ loginUser.username }} 님,
          </span>
          <span v-else>
            <i class="fas fa-user fa-2x"></i>
          </span>
        </li>
        <li class="nav-item mx-1 my-1">
          <router-link
            class="p-2 text-light"
            v-if="!isLoggedIn"
            to="/login"
            >Login</router-link
          >
        </li>
        <li class="nav-item mx-1 my-1">
          <router-link
            class="p-2 text-light"
            v-if="isLoggedIn"
            to="/logout"
            >Logout</router-link
          >
        </li>
        <li class="nav-item mx-1 my-1">
          <router-link
            class="btn btn-danger text-light"
            v-if="!isLoggedIn"
            to="/signup"
            >Sign up</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import API from "../api/api.js";

export default {
  name: "Navbar",
  data() {
    return {
      userAvatarURL: null,
      loginUser: null,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["getUserData"]),
    changeURL() {
      this.userAvatarURL =
        API.DB_BASE +
        this.$store.state.user.avatar.slice(1);
      this.loginUser = this.$store.state.user;
    },
  },
  watch: {
    user: "changeURL",
  },
  created() {
    this.getUserData();
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
  height: 80px;
}
.navbar a {
  text-decoration: none;
  color: #e50a13;
}

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
  height: 25px;
  background: white;
  border-radius: 50%;
  margin-right: 5px;
}
</style>

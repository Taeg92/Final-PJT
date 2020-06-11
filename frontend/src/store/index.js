import Vue from "vue";
import Vuex from "vuex";

import API from "../api/api";
import router from "../router";

import axios from "axios";
import cookies from "vue-cookies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken: cookies.get("auth-token"),
    movies: [],
  },
  getters: {
    isLoggedIn: (state) => !!state.authToken,
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    SET_TOKEN(state, token) {
      state.authToken = token;
      cookies.set("auth-token", token);
    },
  },
  actions: {
    fetchMovies({ commit }) {
      axios
        .get(API.TMDB_BASE + "popular", {
          params: {
            api_key: process.env.VUE_APP_TMDB_API_KEY,
          },
        })
        .then((res) => {
          commit("SET_MOVIES", res.data.results);
        })
        .catch((err) => console.log(err.response));
    },
    postAuthData({ commit }, info) {
      axios
        .post(API.DB_BASE + info.route, info.data)
        .then((res) => {
          commit("SET_TOKEN", res.data.key);
          router.push({ name: "Home" });
        })
        .catch((err) => console.log(err.response));
    },
    login({ dispatch }, loginData) {
      const info = {
        data: loginData,
        route: API.DB_ROUTES.login,
      };
      dispatch("postAuthData", info);
    },
    signup({ dispatch }, signupData) {
      const info = {
        data: signupData,
        route: API.DB_ROUTES.signup,
      };
      dispatch("postAuthData", info);
    },
  },
  modules: {},
});

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
    selectedMovie: null,
  },
  getters: {
    isLoggedIn: (state) => !!state.authToken,
    config: (state) => ({
      headers: {
        Authorization: `Token ${state.authToken}`,
      },
    }),
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    SET_TOKEN(state, token) {
      state.authToken = token;
      cookies.set("auth-token", token);
    },
    SET_SELECTED_MOVIE(state, movie) {
      state.selectedMovie = movie;
    },
    CLEAR_SELECTED_MOVIE(state) {
      state.selectedMovie = null;
    },
  },
  actions: {
    getMovies({ commit }) {
      axios
        .get(API.DB_BASE + API.DB_ROUTES.movies)
        .then((res) => commit("SET_MOVIES", res.data))
        .catch((err) => console.log(err.response));
    },
    getMovieDetail({ commit }, moviePK) {
      axios
        .get(API.DB_BASE + API.DB_ROUTES.movies + moviePK)
        .then((res) =>
          commit("SET_SELECTED_MOVIE", res.data)
        )
        .catch((err) => console.log(err.response));
    },
    clearMovie({ commit }) {
      commit("CLEAR_SELECTED_MOVIE");
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
    logout({ getters }) {
      axios
        .post(
          API.DB_BASE + API.DB_ROUTES.logout,
          null,
          getters.config
        )
        .then(() => {
          this.commit("SET_TOKEN", null);
          cookies.remove("auth-token");
          router.push({ name: "Home" });
        })
        .catch((err) => console.log(err.response));
    },
  },
  modules: {},
});

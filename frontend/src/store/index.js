import Vue from "vue";
import Vuex from "vuex";

import API from "../api/api";

import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [],
  },
  getters: {},
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
      console.log("done");
    },
  },
  actions: {
    fetchMovies({ commit }) {
      axios
        .get(API.BASE + "popular", {
          params: {
            api_key: process.env.VUE_APP_TMDB_API_KEY,
          },
        })
        .then((res) => {
          commit("SET_MOVIES", res.data.results);
        })
        .catch((err) => console.log(err.response));
    },
  },
  modules: {},
});

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
    username: null,
    movies: [],
    reviews: [],
    comments: [],
    selectedMovie: null,
    selectedMovieReviews: [],
    selectedReview: null,
    selectedComment: null,
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
    SET_TOKEN(state, token) {
      state.authToken = token;
      cookies.set("auth-token", token);
    },
    SET_USERNAME(state, username) {
      state.username = username;
    },
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    SET_SELECTED_MOVIE(state, movie) {
      state.selectedMovie = movie;
    },
    SET_SELECTED_MOVIE_REVIEWS(state, reviews) {
      state.selectedMovieReviews = reviews;
    },
    CLEAR_SELECTED_MOVIE(state) {
      state.selectedMovie = null;
    },
    SET_REVIEWS(state, reviews) {
      state.reviews = reviews;
    },
    SET_SELECTED_REVIEW(state, review) {
      state.selectedReview = review;
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    SET_SELECTED_COMMENT(state, comment) {
      state.selectedComment = comment;
    },
  },
  actions: {
    getMovies({ commit }) {
      axios
        .get(API.DB_BASE + API.DB_ROUTES.movies())
        .then((res) => commit("SET_MOVIES", res.data))
        .catch((err) => console.log(err.response));
    },
    getMovieDetail({ commit }, moviePK) {
      axios
        .get(API.DB_BASE + API.DB_ROUTES.movies(moviePK))
        .then((res) =>
          commit("SET_SELECTED_MOVIE", res.data)
        )
        .catch((err) => console.log(err.response));
    },
    clearMovie({ commit }) {
      commit("CLEAR_SELECTED_MOVIE");
    },
    getReviews({ commit }) {
      axios
        .get(API.DB_BASE + API.DB_ROUTES.reviews())
        .then((res) => commit("SET_REVIEWS", res.data))
        .catch((err) => console.log(err.response));
    },
    getMovieReviews({ commit }, moviePK) {
      axios
        .get(API.DB_BASE + API.DB_ROUTES.reviews(moviePK))
        .then((res) =>
          commit("SET_SELECTED_MOVIE_REVIEWS", res.data)
        )
        .catch((err) => console.log(err.response));
    },
    getReviewDetail({ commit }, reviewPK) {
      axios
        .get(
          API.DB_BASE + API.DB_ROUTES.reviewDetail(reviewPK)
        )
        .then((res) => {
          commit("SET_SELECTED_REVIEW", res.data);
        })
        .catch((err) => console.log(err.response));
    },
    deleteReview({ commit, getters }, { moviePK, reviewPK }) {
      console.log(getters.config)
      axios
        .delete(
          API.DB_BASE + API.DB_ROUTES.reviewDetail(reviewPK),
          getters.config
        )
        .then(() => {
          commit("SET_SELECTED_REVIEW", null);
          router.push({
            name: "MovieReviews",
            params: { moviePK: moviePK },
          });
        })
        .catch((err) => console.log(err.response));
    },
    submitReview({ getters }, { moviePK, reviewData }) {
      axios
        .post(
          API.DB_BASE + API.DB_ROUTES.reviews(moviePK),
          reviewData,
          getters.config
        )
        .then((res) => {
          router.push({
            name: "ReviewDetail",
            params: {
              moviePK: moviePK,
              reviewPK: res.data.id,
            },
          });
        })
        .catch((err) => console.log(err.response));
    },
    submitReviewEdit(
      { getters },
      { moviePK, reviewPK, reviewData }
    ) {
      axios
        .put(
          API.DB_BASE +
            API.DB_ROUTES.reviewDetail(reviewPK),
          reviewData,
          getters.config
        )
        .then(() => {
          router.push({
            name: "ReviewDetail",
            params: {
              moviePK: moviePK,
              reviewPK: reviewPK,
            },
          });
        })
        .catch((err) => console.log(err.response));
    },
    getComments({ commit }) {
      axios
        .get(API.DB_BASE + API.DB_ROUTES.comments())
        .then((res) => {
          commit("SET_COMMENTS", res.data);
        })
        .catch((err) => console.log(err.response));
    },
    createComment(
      { getters },
      { moviePK, reviewPK, content }
    ) {
      axios
        .post(
          API.DB_BASE +
            API.DB_ROUTES.commentCreate(reviewPK),
          { content },
          getters.config
        )
        .then(() =>
          router.push({
            name: "CommentCreate",
            params: { moviePK, reviewPK },
          })
        )
        .catch((err) => console.log(err));
    },
    getCommentDetail({ commit }, reviewPK) {
      axios
        .get(API.DB_BASE + API.DB_ROUTES.comments(reviewPK))
        .then((res) => {
          commit("SET_SELECTED_COMMENT", res.data);
        })
        .catch((err) => console.log(err.response));
    },
    putCommentDetail(
      { getters },
      { moviePK, reviewPK, commentPK, commentData }
    ) {
      axios
        .put(
          API.DB_BASE + API.DB_ROUTES.comments(commentPK),
          commentData,
          getters.config
        )
        .then(() =>
          router.push({
            name: "CommentEdit",
            params: { moviePK, reviewPK },
          })
        )
        .catch((err) => console.log(err.response));
    },
    deleteCommentDetail(
      { getters },
      { moviePK, reviewPK, commentPK }
    ) {
      axios
        .delete(
          API.DB_BASE + API.DB_ROUTES.comments(commentPK),
          getters.config
        )
        .then(() => {
          router.push({
            name: "CommentDelete",
            params: { moviePK, reviewPK, commentPK },
          });
        })
        .catch((err) => console.log(err.response));
    },
    postAuthData({ commit }, info) {
      axios
        .post(API.DB_BASE + info.route, info.data)
        .then((res) => {
          commit("SET_TOKEN", res.data.key);
          commit("SET_USERNAME", info.data.username);
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
    logout({ getters, commit }) {
      axios
        .post(
          API.DB_BASE + API.DB_ROUTES.logout,
          null,
          getters.config
        )
        .then(() => {
          commit("SET_TOKEN", null);
          commit("SET_USERNAME", null);
          cookies.remove("auth-token");
          router.push({ name: "Home" });
        })
        .catch((err) => console.log(err.response));
    },
  },
  modules: {},
});

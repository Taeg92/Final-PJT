<template>
  <div class="movie-detail">
    <img :src="poster_path" width="300" height="500" />
    <h4>{{ selectedMovie.title }}</h4>
    <span>평점: {{ selectedMovie.vote_average }}</span>
    <button @click="showReviews">리뷰보기</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "MovieDetail",
  data() {
    return {
      moviePK: null
    };
  },
  computed: {
    ...mapState(["selectedMovie"]),
    poster_path() {
      return (
        "https://image.tmdb.org/t/p/original" + this.selectedMovie.poster_path
      );
    }
  },
  methods: {
    getMoviePK() {
      this.moviePK = this.$route.params.moviePK;
    },
    ...mapActions(["getMovieDetail"]),
    showReviews() {
      this.$router.push(`/movies/${this.moviePK}/reviews`);
    }
  },
  created() {
    this.getMoviePK();
    this.getMovieDetail(this.moviePK);
  }
};
</script>

<style>
</style>
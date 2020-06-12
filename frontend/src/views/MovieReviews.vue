<template>
  <div class="movie-reviews">
    <ul>
      <li
        v-for="review in selectedMovieReviews"
        :key="review.id"
        @click="selectReview(moviePK, review.id)"
      >{{review.title}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "MovieReviews",
  data() {
    return {
      moviePK: null
    };
  },
  computed: { ...mapState(["selectedMovieReviews"]) },
  methods: {
    getMoviePK() {
      this.moviePK = this.$route.params.moviePK;
    },
    ...mapActions(["getMovieReviews"]),
    selectReview(moviePK, reviewPK) {
      this.$router.push(`/movies/${moviePK}/reviews/${reviewPK}`);
    }
  },
  created() {
    this.getMoviePK();
    this.getMovieReviews(this.moviePK);
  }
};
</script>

<style>
</style>
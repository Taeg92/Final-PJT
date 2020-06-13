<template>
  <div class="movie-reviews">
    <ul>
      <li
        v-for="review in selectedMovieReviews"
        :key="review.id"
        @click="selectReview(review.id)"
      >{{review.title}}</li>
    </ul>
    <button @click="createReview">리뷰 작성</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "MovieReviews",
  computed: {
    ...mapState(["selectedMovieReviews"]),
    moviePK() {
      return this.$route.params.moviePK;
    }
  },
  methods: {
    ...mapActions(["getMovieReviews"]),
    selectReview(reviewPK) {
      this.$router.push({
        name: "ReviewDetail",
        params: { moviePK: this.moviePK, reviewPK: reviewPK }
      });
    },
    createReview() {
      // url 접근시 에러남
      this.$router.push({
        name: "ReviewCreate",
        params: { moviePK: this.moviePK }
      });
    }
  },
  created() {
    this.getMovieReviews(this.moviePK);
  }
};
</script>

<style>
</style>
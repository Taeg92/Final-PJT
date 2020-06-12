<template>
  <div class="reviews">
    <ul>
      <li v-for="review in selectedMovieReviews" :key="review.pk">{{review.title}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Reviews",
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
    ...mapActions(["getMovieReviews"])
  },
  created() {
    this.getMoviePK();
    this.getMovieReviews(this.moviePK);
  }
};
</script>

<style>
</style>
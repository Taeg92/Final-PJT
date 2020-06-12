<template>
  <div class="reviews">
    <ul>
      <li
        v-for="review in reviews"
        :key="review.id"
        @click="selectReview(review.movie.id, review.id)"
      >{{review.title}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Reviews",
  computed: { ...mapState(["reviews"]) },
  methods: {
    ...mapActions(["getReviews"]),
    selectReview(moviePK, reviewPK) {
      this.$router.push(`/movies/${moviePK}/reviews/${reviewPK}`);
    }
  },
  created() {
    this.getReviews();
  }
};
</script>

<style>
</style>
<template>
  <div class="reviews">
    <ul>
      <li
        v-for="review in Reviews"
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
  computed: { ...mapState(["Reviews"]) },
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
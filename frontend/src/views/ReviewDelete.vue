<template>
  <div class="review-delete"></div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ReviewDelete",
  computed: {
    reviewPK() {
      return this.$route.params.reviewPK;
    },
    moviePK() {
      return this.$route.params.moviePK;
    }
  },
  methods: {
    ...mapActions(["deleteReview"])
  },
  created() {
    const pkData = {
      moviePK: this.moviePK,
      reviewPK: this.reviewPK
    };
    this.deleteReview(pkData);
  }
};
</script>

<style>
</style>
<template>
  <div class="reviews">
    <ul>
      <li v-for="review in Reviews" :key="review.pk">{{review.title}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Reviews",
  computed: { ...mapState(["Reviews"]) },
  methods: {
    ...mapActions(["getReviews"])
  },
  created() {
    this.getReviews();
  }
};
</script>

<style>
</style>
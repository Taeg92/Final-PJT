<template>
  <div v-if="selectedReview" class="review-detail">
    <div>{{selectedReview.title}}</div>
    <p>{{ selectedReview.content }}</p>
    <div>
      <button @click="editReview">수정하기</button>
      <button @click="deleteReview">삭제하기</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ReviewDetail",
  computed: {
    ...mapState(["selectedReview"]),
    reviewPK() {
      return this.$route.params.reviewPK;
    },
    moviePK() {
      return this.$route.params.moviePK;
    }
  },
  methods: {
    ...mapActions(["getReviewDetail"]),
    editReview() {
      this.$router.push({
        name: "ReviewEdit",
        params: { moviePK: this.moviePK, reviewPK: this.reviewPK }
      });
    },
    deleteReview() {
      this.$router.push({
        name: "ReviewDelete",
        params: { moviePK: this.moviePK, reviewPK: this.reviewPK }
      });
    }
  },
  watch: {
    reviewPK() {
      this.getReviewDetail(this.reviewPK);
    }
  },
  created() {
    this.getReviewDetail(this.reviewPK);
  }
};
</script>

<style>
</style>
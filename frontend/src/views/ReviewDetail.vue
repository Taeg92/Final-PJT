<template>
  <div v-if="selectedReview" class="review-detail">
    <div>{{selectedReview.title}}</div>
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
  data() {
    return {
      reviewPK: null
    };
  },
  computed: {
    ...mapState(["selectedReview"])
  },
  methods: {
    getReviewPK() {
      this.reviewPK = this.$route.params.reviewPK;
    },
    ...mapActions(["getReviewDetail"]),
    editReview() {
      console.log("click edit review button");
    },
    deleteReview() {
      console.log("click delete review button");
    }
  },
  created() {
    this.getReviewPK();
    this.getReviewDetail(this.reviewPK);
  }
};
</script>

<style>
</style>
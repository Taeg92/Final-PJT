<template>
  <div class="review-edit">
    ReviewEdit
    <div>
      <label for="title"></label>
      <input v-model="submitInfo.reviewData.title" id="title" type="text" />
    </div>
    <div>
      <label for="content"></label>
      <textarea v-model="submitInfo.reviewData.content" id="content" />
    </div>
    <div>
      <button @click="submitReviewEdit(submitInfo)">수정완료</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ReviewEdit",
  data() {
    return {
      submitInfo: {
        moviePK: null,
        reviewPK: null,
        reviewData: {
          title: "",
          content: ""
        }
      }
    };
  },
  computed: {
    moviePK() {
      return this.$route.params.moviePK;
    },
    reviewPK() {
      return this.$route.params.reviewPK;
    },
    ...mapState(["selectedReview"])
  },
  methods: {
    ...mapActions(["getReviewDetail", "submitReviewEdit"])
  },
  watch: {
    reviewPK() {
      this.getReviewDetail(this.reviewPK);
      this.initializeInput();
    },
    selectedReview() {
      this.submitInfo.moviePK = this.moviePK;
      this.submitInfo.reviewPK = this.reviewPK;
      this.submitInfo.reviewData.title = this.selectedReview.title;
      this.submitInfo.reviewData.content = this.selectedReview.content;
    }
  },
  created() {
    this.getReviewDetail(this.reviewPK);
  }
};
</script>

<style>
</style>
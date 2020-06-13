<template>
  <div class="review-create">
    Review Create
    <div>
      <label for="title"></label>
      <input id="title" v-model="submitInfo.reviewData.title" type="text" />
    </div>
    <div>
      <label for="content"></label>
      <textarea id="content" v-model="submitInfo.reviewData.content" />
    </div>
    <div>
      <button @click="submitReview(submitInfo)">작성완료</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ReviewCreate",
  data() {
    return {
      submitInfo: {
        moviePK: this.$route.params.moviePK,
        reviewData: {
          title: "",
          content: ""
        }
      }
    };
  },
  methods: {
    ...mapActions(["submitReview"])
  }
};
</script>

<style>
</style>
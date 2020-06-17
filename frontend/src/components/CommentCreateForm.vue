<template>
  <div class="create-comment">
    <label for="content"></label>
    <input v-model="submitInfo.content" type="text" />
    <div
      class="create-btn btn btn-sm btn-primary"
      @click="submitComment"
    >
      작성하기
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CommentCreate",
  data() {
    return {
      submitInfo: {
        reviewPK: this.$route.params.reviewPK,
        content: "",
      },
    };
  },
  methods: {
    ...mapActions(["createComment", "getReviewDetail"]),
    submitComment() {
      this.createComment(this.submitInfo);
      this.getReviewDetail(this.submitInfo.reviewPK);
    },
  },
};
</script>

<style>
.create-comment {
  width: 100%;
  display: flex;
}

.create-comment input {
  width: 100%;
  border: none;
  background-color: rgb(238, 238, 238);
  border-radius: 5px;
  margin-right: 5px;
}

.create-comment input:focus {
  outline: none;
}

.create-btn {
  min-width: 70px !important;
  border-radius: 5px !important;
}
</style>

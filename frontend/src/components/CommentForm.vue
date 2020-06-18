<template>
  <div class="comment-form">
    <label for="content"></label>
    <input
      v-model="submitInfo.content"
      @keypress.enter="submitComment"
      type="text"
    />
    <i
      class="far fa-paper-plane create-btn"
      @click="submitComment"
    ></i>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CommentCreate",
  data() {
    return {
      submitInfo: {
        moviePK: this.$route.params.moviePK,
        reviewPK: this.$route.params.reviewPK,
        content: "",
      },
    };
  },
  methods: {
    ...mapActions(["createComment"]),
    submitComment() {
      this.createComment(this.submitInfo);
    },
  },
};
</script>

<style>
.comment-form {
  display: flex;
  width: 100%;
}

.comment-form input {
  width: 100%;
  background-color: rgb(238, 238, 238);
  border-radius: 5px;
  border: none;
  margin-right: 5px;
}

.comment-form input:focus {
  outline: none;
}

.create-btn {
  padding: 3px 5px;
  background-color: white;
  border-radius: 5px;
  color: #e50a13b3;
  font-size: 10px;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out,
    color 0.1s ease-in-out;
}

.create-btn:hover {
  background-color: #e50a13b3;
  color: white;
}
</style>

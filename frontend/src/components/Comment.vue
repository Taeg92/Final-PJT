<template>
  <div
    class="comment"
    :class="{
      mycomment:
        user && user.username === comment.user.username,
    }"
  >
    <div v-if="!editing">
      <div class="comment__content">
        {{ comment.content }}
      </div>
      <div class="comment__etc">
        <span
          >by
          {{ comment.user.username }}
          <span v-if="comment.user.avatar">
            <img
              class="user-avatar"
              :src="userAvatarURL"
              alt=""
            />
          </span>
          <span v-else>
            <i class="fas fa-user"></i>
          </span>
        </span>
        <div
          v-if="
            user && user.username === comment.user.username
          "
          class="etc__actions"
        >
          <i
            class="fas fa-pencil-alt actions__edit"
            @click="clickEditBtn"
          ></i>
          <i
            class="far fa-trash-alt actions__delete"
            @click="deleteComment"
          ></i>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between" v-else>
      <input type="text" v-model="comment.content" />
      <i
        class="far fa-check-circle submit"
        @click="editComment"
      ></i>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import API from "../api/api.js";

export default {
  name: "Comment",
  props: {
    comment: Object,
  },
  data() {
    return {
      editing: false,
      moviePK: this.$route.params.moviePK,
      reviewPK: this.$route.params.reviewPK,
    };
  },
  computed: {
    ...mapState(["user"]),
    userAvatarURL() {
      return (
        API.DB_BASE + this.comment.user.avatar.slice(1)
      );
    },
  },
  methods: {
    clickEditBtn() {
      this.editing = true;
    },
    ...mapActions([
      "putCommentDetail",
      "deleteCommentDetail",
    ]),
    editComment() {
      const editInfo = {
        moviePK: this.moviePK,
        reviewPK: this.reviewPK,
        commentPK: this.comment.id,
        commentData: {
          content: this.comment.content,
        },
      };
      this.putCommentDetail(editInfo);
    },
    deleteComment() {
      const deleteInfo = {
        moviePK: this.moviePK,
        reviewPK: this.reviewPK,
        commentPK: this.comment.id,
      };
      this.deleteCommentDetail(deleteInfo);
    },
  },
};
</script>

<style scoped>
.comment {
  background-color: rgb(235, 233, 233);
  border-radius: 14px;
  padding: 3px 10px;
}

.comment:not(:last-child) {
  margin-bottom: 5px;
}

.comment__etc {
  margin-top: 5px;
  font-size: 10px;
  display: flex;
  justify-content: space-between;
}

.actions__edit {
  color: rgb(9, 9, 134);
  margin-right: 6px;
  cursor: pointer;
}

.actions__delete {
  color: red;
  cursor: pointer;
}

input {
  width: 80%;
  border: none;
  border-bottom: 1px solid grey;
  background-color: transparent;
}

input:focus {
  outline: none;
}

.mycomment {
  background-color: rgb(255, 237, 189);
}

.user-avatar {
  border-radius: 50%;
  height: 15px;
  background: white;
  margin-right: 5px;
}
</style>

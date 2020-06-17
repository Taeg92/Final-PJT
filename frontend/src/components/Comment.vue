<template>
  <div class="comment">
    <div v-if="!editing">
      <div class="comment__content">{{ comment.content}}</div>
      <div class="comment__etc">
        <span>by. {{ comment.user.username}}</span>
        <div v-if="username === comment.user.username" class="etc__actions">
          <i class="fas fa-pencil-alt actions__edit" @click="clickEditBtn"></i>
          <i class="far fa-trash-alt actions__delete"></i>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between" v-else>
      <input type="text" v-model="comment.content" />
      <i class="far fa-check-circle submit" @click="submitEdittedComment"></i>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Comment",
  props: {
    comment: Object
  },
  data() {
    return {
      editing: false
    };
  },
  computed: { ...mapState(["username"]) },
  methods: {
    clickEditBtn() {
      this.editing = true;
    },
    ...mapActions(["putCommentDetail"]),
    submitEdittedComment() {
      const editInfo = {
        moviePK: this.$route.params.moviePK,
        reviewPK: this.$route.params.reviewPK,
        commentPK: this.comment.id,
        commentData: {
          content: this.comment.content
        }
      };
      this.putCommentDetail(editInfo);
    }
  }
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
}

.actions__delete {
  color: red;
}

input {
  width: 80%;
  border: none;
  border-bottom: 1px solid grey;
  background-color: transparent;
}

.submit {
  font-size: 10px;
  text-align: right;
  margin-top: 5px;
  padding-right: 10px;
  color: rgb(9, 9, 134);
}
</style>
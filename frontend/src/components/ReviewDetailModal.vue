<template>
  <div v-if="selectedReview" class="review-modal">
    <div class="modal__container">
      <header class="modal__close-btn">x</header>
      <div class="modal__column column-left">
        <h4>{{ selectedReview.title }}</h4>
        <div class="text-right mb-2">
          <span v-if="selectedReview.user.avatar">
            <img class="user-avatar" :src="userAvatarURL" alt />
          </span>
          <span v-else>
            <i class="fas fa-user"></i>
          </span>
          {{ selectedReview.user.username }}
        </div>
        <p>{{ selectedReview.content }}</p>
        <div
          v-if="
            user &&
              user.username === selectedReview.user.username
          "
          class="btns"
        >
          <i class="fas fa-pencil-alt btns__btn btn__edit" @click="toEditReview"></i>
          <i class="far fa-trash-alt btns__btn btn__delete" @click="toDeleteReview"></i>
        </div>
      </div>
      <div class="modal__column column-right">
        <Comments v-if="selectedReview.comments.length > 0" :comments="selectedReview.comments"></Comments>
        <div v-else>아직 등록된 댓글이 없습니다.</div>
        <CommentForm />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import API from "../api/api.js";

export default {
  name: "ReviewDetailModal",
  components: {
    Comments,
    CommentForm
  },
  computed: {
    ...mapState(["selectedReview", "user"]),
    reviewPK() {
      return this.$route.params.reviewPK;
    },
    moviePK() {
      return this.$route.params.moviePK;
    },
    userAvatarURL() {
      return API.DB_BASE + this.selectedReview.user.avatar.slice(1);
    }
  },
  methods: {
    ...mapActions(["getReviewDetail"]),
    toEditReview() {
      this.$router.push({
        name: "ReviewEdit",
        params: {
          moviePK: this.moviePK,
          reviewPK: this.reviewPK
        }
      });
    },
    toDeleteReview() {
      this.$router.push({
        name: "ReviewDelete",
        params: {
          moviePK: this.moviePK,
          reviewPK: this.reviewPK
        }
      });
    }
  },
  created() {
    this.getReviewDetail(this.reviewPK);
  }
};
</script>

<style scoped>
.review-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: black;
}

.modal__container {
  position: relative;
  display: flex;
  width: 60%;
  height: 70%;
  background-color: white;
  border-radius: 20px;
}

.modal__container header {
  position: absolute;
  right: 10px;
  font-size: 25px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.6);
}

.modal__close-btn {
  cursor: pointer;
}

.modal__column {
  width: 50%;
}

.column-left {
  border: 1px solid white;
  background-color: black;
  color: white;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  height: 100%;
  overflow-y: scroll;
  padding: 40px 30px;
}

.column-right {
  border: 1px soild black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 20px;
  padding-bottom: 20px;
}

.btns {
  font-size: 20px;
  text-align: right;
  color: white;
  cursor: pointer;
}

.btns__btn:first-child {
  margin-right: 15px;
}

.user-avatar {
  border-radius: 50%;
  height: 20px;
  background: white;
  margin-right: 5px;
}
</style>

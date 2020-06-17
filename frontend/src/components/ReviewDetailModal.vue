<template>
  <div v-if="selectedReview" class="review-modal">
    <div class="review-modal__container">
      <header class="modal__close-btn">x</header>
      <div class="modal__column">
        <h3>{{ selectedReview.title }}</h3>
        <p>{{ selectedReview.content }}</p>
      </div>
      <button class="btn btn-primary" @click="toEditReview">수정하기</button>
      <button class="btn btn-danger" @click="toDeleteReview">삭제하기</button>
      <div class="modal__column">
        <Comments v-if="selectedReview.comments.length > 0" :comments="selectedReview.comments"></Comments>
        <div v-else>아직 등록된 댓글이 없습니다.</div>
        <CommentCreateForm />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Comments from "./Comments";
import CommentCreateForm from "./CommentCreateForm";

export default {
  name: "ReviewDetailModal",
  components: {
    Comments,
    CommentCreateForm
  },
  computed: {
    ...mapState(["selectedReview"]),
    reviewPK() {
      return this.$route.params.reviewPK;
    },
    moviePK() {
      return this.$route.params.moviePK;
    }
  },
  // watch: {
  // selectedReview() {
  // console.log("watch");
  // },
  // },
  methods: {
    ...mapActions(["getReviewDetail"]),
    toEditReview() {
      this.$router.push({
        name: "ReviewEdit",
        params: { moviePK: this.moviePK, reviewPK: this.reviewPK },
      })
    },
    toDeleteReview() {
      this.$router.push({
        name: "ReviewDelete",
        params: { moviePK: this.moviePK, reviewPK: this.reviewPK },
      })
    }
  },
  updated() {
    console.log("updated");
  },
  created() {
    this.getReviewDetail(this.reviewPK);
  }
};
</script>

<style>
.review-modal {
  /* background-color: ; */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black !important;
}

.review-modal__container {
  width: 60%;
  height: 70%;
  background-color: white;
  border-radius: 20px;
  display: flex;
  position: relative;
}

.review-modal__container header {
  position: absolute;
  right: 10px;
  font-size: 25px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.6);
}

.modal__column {
  width: 50%;
  margin: 40px 0;
  padding: 10px 30px;
}

.modal__column:last-child {
  border-left: 1px solid grey;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

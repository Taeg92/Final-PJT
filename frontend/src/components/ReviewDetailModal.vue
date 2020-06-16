<template>
  <div class="review-modal">
    <div class="review-modal__container">
      <div class="modal__column">
        <h3>{{ selectedReview.title }}</h3>
        <p>{{ selectedReview.content }}</p>
      </div>
      <div class="modal__column">
        <ul>
          <li
            v-for="comment in selectedReview.comments"
            :key="comment.id"
          >
            {{ comment.content }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ReviewDetailModal",
  computed: {
    ...mapState(["selectedReview"]),
    reviewPK() {
      return this.$route.params.reviewPK;
    },
    moviePK() {
      return this.$route.params.moviePK;
    },
  },
  methods: {
    ...mapActions(["getReviewDetail"]),
  },
  created() {
    this.getReviewDetail(this.reviewPK);
  },
};
</script>

<style>
.review-modal {
  background-color: transparent;
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
  width: 70%;
  height: 80%;
  background-color: white;
  border-radius: 20px;
  padding: 40px 60px;
  display: flex;
}

.modal__column {
  width: 50%;
}

.modal__column:last-child {
  border-left: 1px solid grey;
}
</style>

<template>
  <div class="review" @click="clickModalOutside">
    <div class="review-container" @click="selectReview">
      <span class="review__title">{{ review.title }}</span>
      <span class="review__user"
        >by. {{ review.user.username }}</span
      >
    </div>
    <ReviewDetailModal v-if="showModal" />
  </div>
</template>

<script>
import ReviewDetailModal from "./ReviewDetailModal";

export default {
  name: "Review",
  props: {
    review: Object,
  },
  data() {
    return {
      showModal: false,
    };
  },
  components: {
    ReviewDetailModal,
  },
  methods: {
    selectReview() {
      this.$router.push({
        name: "ReviewDetail",
        params: {
          moviePK: this.review.movie.id,
          reviewPK: this.review.id,
        },
      });
    },
    clickModalOutside(e) {
      if (
        this.showModal &&
        (e.target.className === "review-modal" ||
          e.target.className === "modal__close-btn")
      ) {
        this.showModal = false;
        this.$router.push({
          name: "MovieReviews",
          params: {
            moviePK: this.review.movie.id,
          },
        });
      }
    },
  },
  watch: {
    $route() {
      if (
        this.$route.name === "ReviewDetail" &&
        Number(this.$route.params.reviewPK) ===
          this.review.id
      ) {
        this.showModal = true;
      }
    },
  },
  created() {
    if (
      this.$route.name === "ReviewDetail" &&
      Number(this.$route.params.reviewPK) === this.review.id
    ) {
      this.showModal = true;
    }
  },
};
</script>

<style scoped>
.review-container {
  background-color: #e50a13b3;
  padding: 10px 20px;
  border-radius: 15px;
  color: #f2f2f2;
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.review-container:not(:last-child) {
  margin-bottom: 10px;
}

.review-container:hover {
  opacity: 0.9;
}

.review {
  margin-bottom: 10px;
}
</style>

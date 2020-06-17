<template>
  <div class="review" @click="clickModalOutside">
    <div class="review-container" @click="selectReview">
      <span class="review__title">{{ review.title }}</span>
      <span>
        <i v-for="n in Number(review.rating)" :key="n" class="fas fa-star rating"></i>
      </span>
      <span class="review__user">by
        <span v-if="review.user.avatar">
          <img class="user-avatar" :src="userAvatarURL" alt="">
        </span>
        <span v-else>
          <i class="fas fa-user fa-2x"></i>
        </span>
        {{ review.user.username }}
      </span>
    </div>
    <ReviewDetailModal v-if="showModal" />
  </div>
</template>

<script>
import ReviewDetailModal from "./ReviewDetailModal";
import API from "../api/api.js";

export default {
  name: "Review",
  props: {
    review: Object
  },
  data() {
    return {
      showModal: false
    };
  },
  components: {
    ReviewDetailModal,
  },
  computed: {
    userAvatarURL() {
      return API.DB_BASE + this.review.user.avatar.slice(1,)
    }
  },
  methods: {
    selectReview() {
      this.$router.push({
        name: "ReviewDetail",
        params: {
          moviePK: this.review.movie.id,
          reviewPK: this.review.id
        }
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
            moviePK: this.review.movie.id
          }
        });
      }
    }
  },
  watch: {
    $route() {
      if (
        this.$route.name === "ReviewDetail" &&
        Number(this.$route.params.reviewPK) === this.review.id
      ) {
        this.showModal = true;
      }
    }
  },
  created() {
    if (
      this.$route.name === "ReviewDetail" &&
      Number(this.$route.params.reviewPK) === this.review.id
    ) {
      this.showModal = true;
    }
  }
};
</script>

<style scoped>
.review-container {
  border: 1px solid #e50a13b3;
  background-color: transparent;
  padding: 10px 20px;
  border-radius: 15px;
  color: #f2f2f2;
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.review:hover {
  background-color: #e50a13b3;
  border-radius: 15px;
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

.rating {
  color: rgb(255, 188, 2);
}
.user-avatar {
  border-radius: 50%;
  height: 40px;
  background: white;
}
</style>

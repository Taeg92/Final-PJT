<template>
  <div class="review" @click="clickModalOutside">
    <div class="review-container" @click="selectReview">
      <div class="container__column">
        <div class="review__title">{{ review.title }}</div>
        <div class="review__rating">
          <i
            v-for="n in Number(review.rating)"
            :key="n"
            class="fas fa-star"
          ></i>
        </div>
      </div>
      <div class="review__user">
        <span v-if="review.user.avatar">
          <img
            class="user-avatar"
            :src="userAvatarURL"
            alt=""
          />
        </span>
        <span v-else>
          <i class="fas fa-user fa-2x"></i>
        </span>
        {{ review.user.username }}
      </div>
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
  computed: {
    userAvatarURL() {
      return API.DB_BASE + this.review.user.avatar.slice(1);
    },
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
.review {
  margin-bottom: 10px;
}

.review:hover {
  background-color: #e50a13b3;
  border-radius: 15px;
}

.review-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background-color: transparent;
  border: 1px solid #e50a13b3;
  border-radius: 15px;
  cursor: pointer;
  color: #f2f2f2;
  transition: opacity 0.1s ease-in-out;
}

.review-container:not(:last-child) {
  margin-bottom: 10px;
}

.review-container:hover {
  opacity: 0.9;
}

.container__column {
  width: 65%;
  display: flex;
}

.review__title {
  width: 70%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
}

.review__rating {
  text-align: left;
}

.review__rating i {
  color: rgb(255, 188, 2);
}

.review__user {
  justify-self: flex-end;
}

.user-avatar {
  height: 20px;
  width: auto;
  background: white;
  border-radius: 50%;
}

.review__user i {
  font-size: 20px;
}
</style>

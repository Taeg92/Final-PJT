<template>
  <div class="movie-reviews">
    <ul class="reviews">
      <li
        v-for="review in selectedMovieReviews"
        :key="review.id"
        @click="selectReview(review.id)"
        class="reviews__review"
      >
        {{ review.title }}
      </li>
    </ul>
    <div class="create-btn" @click="createReview">
      <i class="fas fa-edit"></i>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "MovieReviews",
  computed: {
    ...mapState(["selectedMovieReviews"]),
    moviePK() {
      return this.$route.params.moviePK;
    },
  },
  methods: {
    ...mapActions(["getMovieReviews"]),
    selectReview(reviewPK) {
      this.$router.push({
        name: "ReviewDetail",
        params: {
          moviePK: this.moviePK,
          reviewPK: reviewPK,
        },
      });
    },
    createReview() {
      // url 접근시 에러남
      this.$router.push({
        name: "ReviewCreate",
        params: { moviePK: this.moviePK },
      });
    },
  },
  created() {
    this.getMovieReviews(this.moviePK);
  },
};
</script>

<style>
.movie-reviews {
  width: 100%;
}

.create-btn {
  font-size: 20px;
  text-align: right;
}

.create-btn i {
  background-color: white;
  color: black;
  padding: 10px;
  border-radius: 50%;
  opacity: 0.9;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;
}

.create-btn i:hover {
  background-color: rgb(255, 188, 2);
  color: black;
}

.reviews {
  margin: 0;
  padding: 0;
  list-style: none;
  margin: 10px 0;
}

.reviews__review {
  background-color: rgba(229, 10, 19, 0.7);
  padding: 10px 20px;
  border-radius: 15px;
  color: #f2f2f2;
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;
}

.reviews__review:not(:last-child) {
  margin-bottom: 10px;
}

.reviews__review:hover {
  opacity: 0.9;
}
</style>

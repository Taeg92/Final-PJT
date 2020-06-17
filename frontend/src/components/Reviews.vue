<template>
  <div class="movie-reviews">
    <div v-if="selectedMovieReviews.length > 0">
      <Review v-for="review in selectedMovieReviews" :review="review" :key="review.id" />
    </div>
    <div v-else>아직 등록된 리뷰가 없습니다. 첫 리뷰의 주인공이 되어보세요!</div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Review from "../components/Review";

export default {
  name: "MovieReviews",
  components: { Review },
  computed: {
    ...mapState(["selectedMovieReviews"]),
    moviePK() {
      return this.$route.params.moviePK;
    }
  },
  methods: {
    ...mapActions(["getMovieReviews"]),
    selectReview(reviewPK) {
      this.$router.push({
        name: "ReviewDetail",
        params: {
          moviePK: this.moviePK,
          reviewPK: reviewPK
        }
      });
    }
    // createReview() {
    //   // url 접근시 에러남
    //   this.$router.push({
    //     name: "ReviewCreate",
    //     params: { moviePK: this.moviePK },
    //   });
    // },
  },
  created() {
    this.getMovieReviews(this.moviePK);
  }
};
</script>

<style>
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
</style>

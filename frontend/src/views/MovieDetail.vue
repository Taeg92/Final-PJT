<template>
  <div v-if="selectedMovie" class="movie-detail">
    <div class="movie-container">
      <img :src="poster_path" />
      <div class="movie-container__column">
        <div class="detail" v-if="!isDetailMoreActive">
          <div class="info">
            <h4>{{ selectedMovie.title }}</h4>
            <p>
              <span class="info__release">{{
                selectedMovie.release_date.slice(0, 4)
              }}</span>
              |
              <span
                class="info__genre"
                v-for="genre in selectedMovie.genres"
                :key="selectedMovie.genres.indexOf(genre)"
                >{{ genre.name }}
              </span>
              |
              <span class="info__rating">
                <i class="fas fa-star"></i>
                {{ selectedMovie.vote_average }}
              </span>
              |
            </p>
            <p class="info__overview">
              {{ selectedMovie.overview }}
            </p>
          </div>
          <div class="review">
            <div v-if="selectedMovie.reviews.length > 0">
              <div
                v-if="selectedMovie.reviews.length > 3"
                class="text-right mb-2"
              >
                <span class="more-btn" @click="showReviews">
                  더보기
                </span>
              </div>
              <Review
                v-for="review in selectedMovie.reviews.slice(
                  0,
                  3
                )"
                :review="review"
                :key="review.id"
              />
            </div>
            <div v-else>
              <p>
                아직 등록된 리뷰가 없습니다. 첫 리뷰의
                주인공이 되어보세요!
              </p>
            </div>
          </div>
        </div>
        <div class="review-more" v-if="isDetailMoreActive">
          <Reviews />
        </div>
        <div class="review-create-btn">
          <i class="fas fa-edit"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Reviews from "../components/Reviews";
import Review from "../components/Review";

export default {
  name: "MovieDetail",
  data() {
    return {
      isDetailMoreActive: null,
    };
  },
  components: {
    Reviews,
    Review,
  },
  computed: {
    moviePK() {
      return this.$route.params.moviePK;
    },
    ...mapState(["selectedMovie"]),
    poster_path() {
      return (
        "https://image.tmdb.org/t/p/original" +
        this.selectedMovie.poster_path
      );
    },
  },
  methods: {
    ...mapActions(["getMovieDetail"]),
    showReviews() {
      this.$router.push({
        name: "MovieReviews",
        params: { moviePK: this.moviePK },
      });
    },
  },
  watch: {
    moviePK() {
      this.getMovieDetail(this.moviePK);
    },
    $route() {
      this.isDetailMoreActive =
        this.$route.name === "MovieReviews" ||
        this.$route.name === "ReviewDetail";
    },
  },
  created() {
    this.getMovieDetail(this.moviePK);
    this.isDetailMoreActive =
      this.$route.name === "MovieReviews" ||
      this.$route.name === "ReviewDetail";
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.movie-detail {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.movie-container {
  width: 70%;
  height: 80%;
  display: flex;
  align-items: start;
  font-size: 14px;
  line-height: 1.3;
}

.movie-container img {
  margin-right: 20px;
  min-width: 250px;
  width: 50%;
  height: auto;
}

.movie-container__column {
  width: 100%;
  height: 100%;
}

.info {
  padding-bottom: 5px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(252, 252, 252, 0.5);
}

.info__rating i {
  color: rgb(255, 188, 2);
}

.info__overview {
  height: 90px;
  overflow-y: scroll;
}

.more-btn {
  font-weight: 600;
  cursor: pointer;
  transition: color 0.1s ease-in-out;
}

.more-btn:hover {
  color: rgba(252, 252, 252, 0.8);
}

.review-create-btn {
  font-size: 20px;
  text-align: right;
}

.review-create-btn i {
  background-color: white;
  color: black;
  padding: 10px;
  border-radius: 50%;
  opacity: 0.9;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;
}

.review-create-btn i:hover {
  background-color: rgb(255, 188, 2);
  color: black;
}

.review-more {
  padding-right: 10px;
  height: 480px;
  overflow-y: scroll;
}
</style>

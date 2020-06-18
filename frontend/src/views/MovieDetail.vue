<template>
  <div v-if="selectedMovie" class="movie-detail">
    <div class="detail-container">
      <div class="container__column">
        <img :src="poster_path" />
        <i
          @click="toCreateReview"
          class="fas fa-edit detail__review-create-btn"
        ></i>
      </div>
      <div class="container__column">
        <div class="detail__info" v-if="!isMovieDetails">
          <div class="info__desc">
            <h4>{{ selectedMovie.title }}</h4>
            <p>
              <span class="desc__release">{{
                selectedMovie.release_date.slice(0, 4)
              }}</span>
              |
              <span
                class="desc__genre"
                v-for="genre in selectedMovie.genres"
                :key="selectedMovie.genres.indexOf(genre)"
                >{{ genre.name }}
              </span>
              |
              <span class="desc__rating">
                <i class="fas fa-star"></i>
                {{ selectedMovie.vote_average }}
              </span>
              |
            </p>
            <p class="desc__overview">
              {{ selectedMovie.overview }}
            </p>
          </div>
          <div class="info__reviews">
            <div
              class="reviews__has"
              v-if="selectedMovie.reviews.length > 0"
            >
              <span
                v-if="selectedMovie.reviews.length > 3"
                class="reviews__more-btn"
                @click="showMoreReviews"
              >
                리뷰 더보기
              </span>
              <div class="reviews__container">
                <Review
                  v-for="review in selectedMovie.reviews.slice(
                    0,
                    3
                  )"
                  :review="review"
                  :key="review.id"
                />
              </div>
            </div>
            <div class="reviews__none" v-else>
              <p>
                아직 등록된 리뷰가 없습니다. 첫 리뷰의
                주인공이 되어보세요!
              </p>
            </div>
          </div>
        </div>
        <div
          class="detail__reviews-more"
          v-if="isMovieDetails"
        >
          <i
            class="fas fa-long-arrow-alt-left"
            @click="backToDetail"
          ></i>
          <Reviews />
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
      isMovieDetails: null,
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
    showMoreReviews() {
      this.$router.push({
        name: "MovieReviews",
        params: { moviePK: this.moviePK },
      });
    },
    toCreateReview() {
      this.$router.push({
        name: "ReviewCreate",
        params: { moviePK: this.moviePK },
      });
    },
    backToDetail() {
      this.$router.push({
        name: "MovieDetail",
        params: { moviePK: this.moviePK },
      });
    },
  },
  watch: {
    moviePK() {
      this.getMovieDetail(this.moviePK);
    },
    $route() {
      this.isMovieDetails =
        this.$route.name === "MovieReviews" ||
        this.$route.name === "ReviewDetail";
    },
  },
  created() {
    this.getMovieDetail(this.moviePK);
    this.isMovieDetails =
      this.$route.name === "MovieReviews" ||
      this.$route.name === "ReviewDetail";
  },
};
</script>

<style scoped>
.movie-detail {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.detail-container {
  display: flex;
  align-items: start;
  width: 70%;
  height: 80%;
  font-size: 14px;
  line-height: 1.3;
}

.container__column:first-child {
  position: relative;
  width: 30%;
  height: 100%;
  min-width: 250px;
}

img {
  width: 100%;
  height: auto;
}

.container__column:last-child {
  position: relative;
  width: 70%;
  height: 100%;
  margin-left: 20px;
}

.detail__info {
  height: 100%;
}

.info__desc {
  margin-bottom: 15px;
  border-bottom: 1px solid rgb(212, 212, 212);
}

.desc__rating i {
  color: rgb(255, 188, 2);
}

.desc__overview {
  height: 50px;
  overflow-y: scroll;
}

.reviews__has {
  text-align: right;
}

.reviews__container {
  margin-top: 5px;
}

.reviews__none {
  text-align: center;
  font-size: 20px;
}

.reviews__more-btn {
  font-weight: 600;
  cursor: pointer;
  transition: color 0.1s ease-in-out;
}

.reviews__more-btn:hover {
  color: rgba(252, 252, 252, 0.8);
}

.detail__review-create-btn {
  position: absolute;
  top: -10px;
  left: -10px;
  background-color: rgb(255, 188, 2);
  color: black;
  font-size: 20px;
  padding: 10px;
  border-radius: 50%;
  opacity: 0.9;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;
}

.detail__review-create-btn:hover {
  color: black;
  background-color: white;
}

.detail__reviews-more {
  padding-right: 10px;
  height: 480px;
  overflow-y: scroll;
}

.detail__reviews-more i {
  position: absolute;
  background-color: white;
  color: black;
  padding: 0px 15px;
  border-radius: 10px;
  top: -30px;
  font-size: 20px;
  margin-bottom: 10px;
  transition: background-color 0.2s ease-in-out;
}

.detail__reviews-more i:hover {
  background-color: rgba(252, 252, 252, 0.8);
}
</style>

<template>
  <div v-if="selectedMovie" class="movie-detail">
    <div class="backdrop"></div>
    <div class="movie-container">
      <img :src="poster_path" width="300" height="auto" />
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
            <div class="text-right">
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
        </div>
        <div class="review-more" v-if="isDetailMoreActive">
          <!-- <Reviews :reviews="selectedMovie.reviews" /> -->
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

// const init = function() {
//   const moreBtn = document.querySelector(".more-btn");
//   const info = document.querySelector(".detail");

//   const handleMoreBtnClick = function() {
//     console.log("눌림");
//     info.classList.add("hide");
//   };

//   moreBtn.addEventListener("click", handleMoreBtnClick);
// };

// window.addEventListener("load", init);

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

<style>
.movie-container {
  padding: 40px 150px;
  width: 100vw;
  display: flex;
  align-items: start;
  height: 100vh;
  font-size: 14px;
  line-height: 1.3;
  /* border: 1px solid white; */
}

.movie-container img {
  margin-right: 20px;
}

.movie-container__column {
  width: 100%;
}

.info__rating i {
  color: rgb(255, 188, 2);
}

.review {
  border-top: 1px solid rgba(252, 252, 252, 0.5);
  padding-top: 20px;
}

.more-btn {
  font-weight: 600;
  cursor: pointer;
  transition: color 0.1s ease-in-out;
}

.more-btn:hover {
  /* color: rgba(229, 10, 19, 0.7); */
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
</style>

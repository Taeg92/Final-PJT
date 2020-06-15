<template>
  <div v-if="selectedMovie" class="movie-detail">
    <div class="backdrop"></div>
    <div class="movie-container">
      <img :src="poster_path" width="300" height="auto" />
      <div class="detail">
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
              >{{ genre }}</span
            >
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
          <div @click="showReviews" class="text-right">
            <span class="more-btn">
              더보기
            </span>
          </div>
          <Reviews :reviews="selectedMovie.reviews" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Reviews from "../components/Reviews";

export default {
  name: "MovieDetail",
  components: {
    Reviews,
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
  },
  created() {
    this.getMovieDetail(this.moviePK);
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
</style>

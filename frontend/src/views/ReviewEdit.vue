<template>
  <div class="review-edit">
    <div
      class="background"
      v-bind:style="{
        backgroundImage: 'url(' + backdrop_poster + ')',
      }"
    ></div>
    <div class="background-filter"></div>
    <div class="edit-container">
      <div
        class="container__cancel-btn"
        @click="backToDetail"
      >
        x
      </div>
      <div class="container__contents">
        <div class="contents__column">
          <img :src="movie_poster" />
        </div>
        <div class="contents__column">
          <input
            class="form-control"
            id="title"
            v-model="submitInfo.reviewData.title"
            type="text"
          />
          <small
            ><span class="text-muted d-block my-1"
              >수정할 제목을 입력해주세요.</span
            ></small
          >
          <textarea
            class="form-control"
            id="content"
            v-model="submitInfo.reviewData.content"
            rows="7"
          />
          <small
            ><span class="text-muted d-block mt-1"
              >수정할 리뷰 내용을 입력해주세요.</span
            ></small
          >
          <div class="contents__rating">
            <i
              class="fas fa-star fa-3x"
              :class="{ onStar: isChecked(1) }"
              id="1"
              @click="getRating"
              style="cursor: pointer"
            ></i>
            <i
              class="fas fa-star fa-3x"
              :class="{ onStar: isChecked(2) }"
              id="2"
              @click="getRating"
              style="cursor: pointer"
            ></i>
            <i
              class="fas fa-star fa-3x"
              :class="{ onStar: isChecked(3) }"
              id="3"
              @click="getRating"
              style="cursor: pointer"
            ></i>
            <i
              class="fas fa-star fa-3x"
              :class="{ onStar: isChecked(4) }"
              id="4"
              @click="getRating"
              style="cursor: pointer"
            ></i>
            <i
              class="fas fa-star fa-3x"
              :class="{ onStar: isChecked(5) }"
              id="5"
              @click="getRating"
              style="cursor: pointer"
            ></i>
          </div>
          <small
            ><span class="text-muted d-block mt-2"
              >수정할 평점을 입력해주세요.</span
            ></small
          >
          <button
            class="form-control btn-danger mt-2"
            @click="submitReviewEdit(submitInfo)"
          >
            리뷰 수정
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ReviewEdit",
  data() {
    return {
      submitInfo: {
        moviePK: this.$route.params.moviePK,
        reviewPK: null,
        reviewData: {
          title: "",
          content: "",
          rating: "",
        },
      },
      backdrop_poster: null,
      movie_poster: null,
    };
  },
  computed: {
    moviePK() {
      return this.$route.params.moviePK;
    },
    reviewPK() {
      return this.$route.params.reviewPK;
    },
    ...mapState(["selectedReview", "selectedMovie"]),
  },
  methods: {
    ...mapActions([
      "getReviewDetail",
      "submitReviewEdit",
      "getMovieDetail",
    ]),
    changeURL() {
      this.backdrop_poster =
        "https://image.tmdb.org/t/p/original" +
        this.selectedMovie.backdrop_path;
      this.movie_poster =
        "https://image.tmdb.org/t/p/original" +
        this.selectedMovie.poster_path;
    },
    getRating(event) {
      this.submitInfo.reviewData.rating = event.target.id;
    },
    isChecked(value) {
      if (value <= this.submitInfo.reviewData.rating) {
        return true;
      } else {
        return false;
      }
    },
    backToDetail() {
      this.$router.push({
        name: "MovieDetail",
        params: { moviePK: this.moviePK },
      });
    },
  },
  watch: {
    selectedMovie: "changeURL",
    reviewPK() {
      this.getReviewDetail(this.reviewPK);
      this.initializeInput();
    },
    selectedReview() {
      this.submitInfo.moviePK = this.moviePK;
      this.submitInfo.reviewPK = this.reviewPK;
      this.submitInfo.reviewData.title = this.selectedReview.title;
      this.submitInfo.reviewData.content = this.selectedReview.content;
      this.submitInfo.reviewData.rating = this.selectedReview.rating;
    },
  },
  created() {
    this.getMovieDetail(this.submitInfo.moviePK);
    this.getReviewDetail(this.reviewPK);
  },
};
</script>

<style scoped>
.review-edit {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-size: cover;
  height: 100%;
  z-index: auto;
}

.background-filter {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: auto;
}

.edit-container {
  position: relative;
  height: 80%;
  width: 70%;
  min-width: 650px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  padding: 50px;
  z-index: 5;
}

.container__cancel-btn {
  position: absolute;
  top: 3px;
  right: 15px;
  font-size: 25px;
  font-weight: 600;
}

.container__contents {
  display: flex;
}

.contents__column:first-child {
  width: 30%;
  height: 100%;
  min-width: 250px;
  margin-right: 20px;
}

.contents__column:first-child img {
  width: 100%;
  height: auto;
  border-radius: 15px;
}

.contents__column:last-child {
  width: 70%;
  height: 100%;
}

.contents__column:last-child input {
  width: 100%;
}

.contents__rating {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 5px;
  color: rgb(204, 204, 204);
}

.onStar {
  color: orange;
}
</style>

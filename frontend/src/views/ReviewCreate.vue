<template>
  <div>
    <div class="background" v-bind:style="{ backgroundImage: 'url(' + backdrop_poster + ')' }"></div>
    <div class="background-filter"></div>
    <div class="create-review container">
      <h3 class="text-light font-weight-bold mb-4">리뷰 작성</h3>
      <div class="row">
        <div class="col-sm-4">
          <img class="img-fluid movie-post" :src="movie_poster">
        </div>
        <div class="col-sm-8">
          <div>
            <input
              class="form-control"
              id="title"
              v-model="submitInfo.reviewData.title"
              type="text"
            />
            <small><span class="text-muted d-block my-1">제목을 입력해주세요.</span></small>
          </div>
          <div>
            <textarea
              class="form-control"
              id="content"
              v-model="submitInfo.reviewData.content"
              rows="7"
            />
            <small><span class="text-muted d-block mt-1">리뷰 내용을 입력해주세요.</span></small>
          </div>
          <div class="my-3">
            <div class="d-flex justify-content-around">
              <i class="fas fa-star fa-3x" :class="{onStar: isChecked(1)}" id="1" @click="getRating" style="cursor: pointer"></i>
              <i class="fas fa-star fa-3x" :class="{onStar: isChecked(2)}" id="2" @click="getRating" style="cursor: pointer"></i>
              <i class="fas fa-star fa-3x" :class="{onStar: isChecked(3)}" id="3" @click="getRating" style="cursor: pointer"></i>
              <i class="fas fa-star fa-3x" :class="{onStar: isChecked(4)}" id="4" @click="getRating" style="cursor: pointer"></i>
              <i class="fas fa-star fa-3x" :class="{onStar: isChecked(5)}" id="5" @click="getRating" style="cursor: pointer"></i>
            </div>
            <small><span class="text-muted d-block mt-2">평점을 입력해주세요.</span></small>
          </div>
          <button class="form-control btn-danger mt-5" @click="submitReview(submitInfo)">리뷰 작성</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ReviewCreate",
  data() {
    return {
      submitInfo: {
        moviePK: this.$route.params.moviePK,
        reviewData: {
          title: "",
          content: "",
          rating: null
        }
      },
      backdrop_poster: null,
      movie_poster: null,
    };
  },
  computed: {
    ...mapState(["selectedMovie"]),
  },
  methods: {
    ...mapActions(['getMovieDetail', 'submitReview']),
    changeURL() {
      this.backdrop_poster = "https://image.tmdb.org/t/p/original" + this.selectedMovie.backdrop_path
      this.movie_poster = "https://image.tmdb.org/t/p/original" + this.selectedMovie.poster_path
    },
    getRating(event) {
      this.submitInfo.reviewData.rating = event.target.id
    },
    isChecked(value) {
      if (value <= this.submitInfo.reviewData.rating) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    'selectedMovie': 'changeURL'
  },
  created() {
    this.getMovieDetail(this.submitInfo.moviePK);
  }
};
</script>

<style scoped>
.create-review {
  margin-top: 30px;
  background: rgba(0, 0, 0, 0.7);
  padding: 50px;
  height: 600px;
  width: 900px;
  border-radius: 5px;
}
.background {
  height: 100vh;
  position: absolute;
  background-size: cover;
  top: 0;
  left: 0;
  right: 0;
  z-index:-1;
}
.background-filter {
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
.movie-post {
  border-radius: 15px;
}

.onStar {
  color: orange;
}
</style>
<template>
  <div class="home">
    <div class="poster-container">
      <Poster
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <div class="arrow left-arrow">
      <i class="fas fa-chevron-circle-left"></i>
    </div>
    <div class="arrow right-arrow">
      <i class="fas fa-chevron-circle-right"></i>
    </div>
  </div>
</template>

<script>
import Poster from "../components/Poster";
import { mapState, mapActions } from "vuex";

const init = function() {
  const posterContainer = document.querySelector(
    ".poster-container"
  );
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  const sideScroll = function(
    element,
    direction,
    speed,
    distance,
    step
  ) {
    let scrollAmount = 0;
    const slideTimer = setInterval(function() {
      if (direction == "left") {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  };

  const moveToLeft = function() {
    sideScroll(posterContainer, "right", 50, 100, 365);
  };

  const moveToRight = function() {
    sideScroll(posterContainer, "left", 25, 100, 365);
  };

  leftArrow.addEventListener("click", moveToLeft);
  rightArrow.addEventListener("click", moveToRight);
};

window.addEventListener("load", init);

export default {
  name: "Home",
  components: {
    Poster,
  },
  computed: {
    ...mapState(["movies"]),
  },
  methods: {
    // ...mapActions(["getMovies"]),
    ...mapActions(["getRecommendations"]),
  },
  created() {
    // this.getMovies();
    this.getRecommendations();
  },
};
</script>

<style scoped>
.poster-container {
  display: flex;
  overflow: hidden;
  overflow: scroll;
  padding: 40px 20px;
}

.arrow {
  position: absolute;
  top: 50%;
  font-size: 40px;
  color: white;
  opacity: 0.9;
}

.left-arrow {
  left: 20px;
}

.right-arrow {
  right: 20px;
}
</style>

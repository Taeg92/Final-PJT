<template>
  <div class="home">
    <Poster v-for="movie in movies" :key="movie.id" :movie="movie" />
    <i class="fas fa-chevron-circle-left" @click="scrollLeft"></i>
    <i class="fas fa-chevron-circle-right" @click="scrollRight"></i>
  </div>
</template>

<script>
import Poster from "../../components/Poster";
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Poster
  },
  computed: {
    ...mapState(["movies"])
  },
  methods: {
    ...mapActions(["getRecommendations"]),
    sideScroll(direction, step, distance, speed) {
      const home = document.querySelector(".home");
      let scrollAmount = 0;
      const slideTimer = setInterval(function() {
        if (direction == "left") {
          home.scrollLeft -= step;
        } else {
          home.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
          clearInterval(slideTimer);
        }
      }, speed);
    },
    scrollLeft() {
      this.sideScroll("right", 20, 360, 20);
    },
    scrollRight() {
      this.sideScroll("left", 20, 360, 20);
    }
  },
  created() {
    this.getRecommendations();
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: scroll;
  padding: 40px 20px;
  padding-right: 0;
}

.home i {
  position: absolute;
  top: 45%;
  font-size: 40px;
  color: white;
  opacity: 0.9;
}

.home i:last-of-type {
  right: 20px;
}

.hide {
  display: none;
}
</style>

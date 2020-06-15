<template>
  <div class="poster">
    <img
      :src="poster_path"
      width="350"
      height="500"
      @click="selectMovie"
    />
    <div class="poster__overlay"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "poster",
  props: {
    movie: Object,
  },
  computed: {
    poster_path() {
      return (
        "https://image.tmdb.org/t/p/original" +
        this.movie.poster_path
      );
    },
  },
  methods: {
    ...mapActions(["clearMovie"]),
    selectMovie() {
      this.clearMovie();
      this.$router.push(`/movies/${this.movie.id}`);
    },
  },
};
</script>

<style scoped>
.poster {
  position: relative;
  margin: 15px;
  transition: transform 0.2s ease-in-out;
  -webkit-box-shadow: 5px 6px 19px -7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 5px 6px 19px -7px rgba(0, 0, 0, 0.75);
  box-shadow: 5px 6px 19px -7px rgba(0, 0, 0, 0.75);
  cursor: pointer;
}

.poster:hover {
  transform: scale(1.1);
}

/* .poster__overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
}

.poster__overlay:hover {
  opacity: 1;
} */
/* .poster:after {
  content: "";
  display: block;
  height: 100%;
  width: 100%;
  opacity: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: all 1s;
}

.poster:hover:after {
  opacity: 1;
} */
</style>

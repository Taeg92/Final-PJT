<template>
  <div class="poster">
    <img
      :src="poster_path"
      :class="{
        poster__img: $route.name === 'Home',
        'poster__img-sm': $route.name === 'MoviesAll',
      }"
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
    movie: Object
  },
  computed: {
    poster_path() {
      return "https://image.tmdb.org/t/p/original" + this.movie.poster_path;
    }
  },
  methods: {
    ...mapActions(["clearMovie"]),
    selectMovie() {
      this.clearMovie();
      this.$router.push(`/movies/${this.movie.id}`);
    }
  }
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

.poster__img {
  width: 300px;
  height: auto;
}

.poster__img-sm {
  width: 100px;
  height: auto;
}
</style>

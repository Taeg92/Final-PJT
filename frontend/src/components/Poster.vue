<template>
  <div class="poster">
    <img :src="poster_path" width="130" height="200" />
  </div>
</template>

<script>
export default {
  name: "poster",
  props: {
    movie: Object
  },
  computed: {
    poster_path() {
      return "https://image.tmdb.org/t/p/original" + this.movie.poster_path;
    }
  }
};
</script>

<style>
</style>
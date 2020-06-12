<template>
  <div class="poster">
    <img :src="poster_path" width="130" height="200" @click="selectMovie" />
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
  margin: 15px;
}
</style>
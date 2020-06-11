<template>
  <div class="home">
    <Poster v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script>
import Poster from "../components/Poster";
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    Poster
  },
  computed: {
    ...mapState(["movies"])
  },
  methods: {
    ...mapActions(["getMovies"])
  },
  created() {
    this.getMovies();
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-wrap: wrap;
}
</style>
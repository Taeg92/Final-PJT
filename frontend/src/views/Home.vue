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
    ...mapActions(["fetchMovies"])
  },
  created() {
    this.fetchMovies();
  }
};
</script>

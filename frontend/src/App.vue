<template>
  <div id="app">
    <Navbar />
    <main>
      <router-view :key="$route.fullPath" />
    </main>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: #f2f2f2 !important;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>

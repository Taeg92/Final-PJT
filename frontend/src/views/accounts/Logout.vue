<template>
  <div class="logout"></div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Logout",
  methods: {
    ...mapActions(["logout"]),
  },
  created() {
    this.logout();
  },
};
</script>

<style></style>

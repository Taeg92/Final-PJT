<template>
  <div></div>
</template>

<script>
export default {
  name: "CommentDelete",
  created() {
    this.$router.push({
      name: "ReviewDetail",
      params: {
        moviePK: this.$route.params.moviePK,
        reviewPK: this.$route.params.reviewPK
      }
    });
  }
};
</script>

<style>
</style>
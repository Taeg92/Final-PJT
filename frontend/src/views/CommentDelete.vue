<template>
  <div>

  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CommentDelete",
  methods: {
    ...mapActions(["deleteCommentDetail"])
  },
  computed: {
    commentPK() {
      return this.$route.params.commentPK;
    }
  },
  created() {
    this.deleteCommentDetail(this.commentPK);
  }
};
</script>

<style>

</style>
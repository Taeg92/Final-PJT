<template>
  <div class="comments">
    <Comment v-for="comment in comments" :comment="comment" :key="comment.id" />
  </div>
</template>

<script>
import Comment from "./Comment";

export default {
  name: "Comments",
  components: {
    Comment
  },
  props: {
    comments: Array
  }
};
</script>

<style>
.comments {
  height: 85%;
  overflow-y: scroll;
}
</style>
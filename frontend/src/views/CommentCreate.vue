<template>
  <div class="create-comment">
    <h1>댓글 작성</h1>
    <div>
      <label for="content">내용</label>
      <input id="content" v-model="commentData.content" type="text" />
    </div>
    <button @click="createComment(commentData)">작성하기</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CommentCreate',
  data() {
    return {
      commentData: {
        content: null,
      }
    }
  },
  methods: {
    ...mapActions(["createComment"])
  }
}
</script>

<style>

</style>
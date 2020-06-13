<template>
  <div class="create-comment">
    <h1>댓글 수정</h1>
    <div>
      <label for="content">내용</label>
      <input id="content" v-model="editInfo.commentData.content" type="text" />
    </div>
    <button @click="putCommentDetail(editInfo)">작성하기</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'CommentEdit',
  data() {
    return {
      editInfo: {
        commentPK: 1,
        commentData: {
          content: null,
        }
      }
    }
  },
  computed: {
    ...mapState(['selectedComment'])
  },
  methods: {
    ...mapActions(["getCommentDetail", "putCommentDetail"]),
    changeInput() {
      this.editInfo.commentData.content = this.$store.state.selectedComment.content
    },
  },
  watch: {
    'selectedComment': 'changeInput'
  },
  created() {
    this.getCommentDetail(1)
  },
}
</script>

<style>

</style>
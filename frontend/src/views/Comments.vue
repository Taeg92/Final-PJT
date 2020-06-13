<template>
  <div>
    <ul>
      <li v-for="comment in comments" :key="comment.id">{{comment.content}}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Comments',
  computed: {
    ...mapState(['comments'])
  },
  methods: {
    ...mapActions(['getComments'])
  },
  created() {
    this.getComments()
  }
}
</script>

<style>

</style>
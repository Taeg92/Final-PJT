<template>
  <div class="comment">
    <div class="comment__content">{{ comment.content}}</div>
    <div class="comment__etc">
      <span>by. {{ comment.user.username}}</span>
      <div class="etc__actions">
        <span class="actions__edit">수정하기</span>
        <span class="actions__delete">삭제하기</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: Object
  }
};
</script>

<style>
.comment {
  background-color: rgb(235, 233, 233);
  border-radius: 14px;
  padding: 3px 10px;
}

.comment:not(:last-child) {
  margin-bottom: 5px;
}

.comment__etc {
  margin-top: 5px;
  font-size: 10px;
  display: flex;
  justify-content: space-between;
}

.actions__edit {
  color: rgb(9, 9, 134);
  margin-right: 6px;
}

.actions__delete {
  color: red;
}
</style>
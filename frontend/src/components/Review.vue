<template>
  <div class="review">
    <span class="review__title">{{ review.title }}</span>
    <span class="review__user"
      >by. {{ review.user.username }}</span
    >
  </div>
</template>

<script>
export default {
  name: "Review",
  props: {
    review: Object,
  },
};
</script>

<style scoped>
.review {
  background-color: #e50a13b3;
  padding: 10px 20px;
  border-radius: 15px;
  color: #f2f2f2;
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.review:not(:last-child) {
  margin-bottom: 10px;
}

.review:hover {
  opacity: 0.9;
}
</style>

<template>
  <div class="review-create-btn" @click="createReview">
    <i class="fas fa-edit"></i>
  </div>
</template>

<script>
export default {};
</script>

<style>
.review-create-btn {
  font-size: 20px;
  text-align: right;
}

.review-create-btn i {
  background-color: white;
  color: black;
  padding: 10px;
  border-radius: 50%;
  opacity: 0.9;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;
}

.review-create-btn i:hover {
  background-color: rgb(255, 188, 2);
  color: black;
}
</style>

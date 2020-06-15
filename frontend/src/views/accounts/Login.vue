<template>
  <div class="login container">
    <h2 class="text-light font-weight-bold mb-4">로그인</h2>
    <div>
      <input
        class="form-control"
        id="username"
        v-model="loginData.username"
        type="text"
      />
      <small><span class="text-muted d-block my-1">아이디를 입력해주세요.</span></small>
    </div>
    <div>
      <input
        class="form-control"
        id="password"
        v-model="loginData.password"
        type="password"
      />
      <small><span class="text-muted d-block mt-1 mb-5">비밀번호를 입력해주세요.</span></small>
    </div>
    <button class="font-weight-bold btn-danger form-control mb-5" @click="login(loginData)">로그인</button>
    <p class="text-muted mt-3">
      회원이 아닌가요? <router-link class="text-light font-weight-bold" to="/signup">지금 가입하세요.</router-link>
      <br>
      <small>이 페이지는 Google reCAPTCHA의 보호를 받아 사용자가 로봇이 아님을 확인합니다. 자세히 알아보기</small>
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      loginData: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    ...mapActions(["login"]),
  },
};
</script>

<style scoped>
.login {
  background: rgba(0, 0, 0, 0.8);
  padding: 50px;
  height: 600px;
  width: 400px;
  border-radius: 5px;
}

</style>

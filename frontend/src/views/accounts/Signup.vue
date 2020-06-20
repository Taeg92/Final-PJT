<template>
  <div class="signup">
    <div class="background"></div>
    <div class="background-filter"></div>
    <div class="signup-container">
      <h2 class="text-light font-weight-bold mb-4">회원 가입</h2>
      <input class="form-control" id="username" v-model="signupData.username" type="text" />
      <small>
        <span class="text-muted d-block my-1">아이디를 입력해주세요.</span>
      </small>
      <form>
        <input class="form-control" id="password1" v-model="signupData.password1" type="password" />
      </form>
      <small>
        <span class="text-muted d-block mt-1">비밀번호를 입력해주세요.</span>
      </small>
      <form>
        <input class="form-control" id="password2" v-model="signupData.password2" type="password" />
      </form>
      <small>
        <span class="text-muted d-block mt-1 mb-4">비밀번호를 한번 더 입력해주세요.</span>
      </small>
      <button class="form-control btn-danger" @click="signup(signupData)">회원 가입</button>
      <p class="text-muted mt-3">
        이미 가입한 회원이신가요?
        <router-link class="text-light font-weight-bold" to="/login">로그인하기.</router-link>
        <br />
        <small>이 페이지는 Google reCAPTCHA의 보호를 받아 사용자가 로봇이 아님을 확인합니다. 자세히 알아보기</small>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      signupData: {
        username: null,
        password1: null,
        password2: null
      }
    };
  },
  methods: {
    ...mapActions(["signup"])
  }
};
</script>

<style scoped>
.signup {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-image: url("https://assets.nflxext.com/ffe/siteui/vlv3/3b48f428-24ed-4692-bb04-bc7771854131/fb5674c7-afc0-4c05-9f06-ef601019b114/KR-ko-20200302-popsignuptwoweeks-perspective_alpha_website_small.jpg");
  height: 100%;
  z-index: auto;
}

.background-filter {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: auto;
}

.signup-container {
  width: 400px;
  height: 80%;
  background: rgba(0, 0, 0, 0.8);
  padding: 30px;
  border-radius: 5px;
  z-index: 5;
}
</style>

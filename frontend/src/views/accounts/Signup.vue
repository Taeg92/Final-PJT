<template>
  <div class="signup">
    <div>
      <label for="username">username</label>
      <input id="username" v-model="signupData.username" type="text" />
    </div>
    <div>
      <label for="password1">password</label>
      <input id="password1" v-model="signupData.password1" type="password" />
    </div>
    <div>
      <label for="password2">password</label>
      <input id="password2" v-model="signupData.password2" type="password" />
    </div>
    <div>
      <button @click="signup(signupData)">Signup</button>
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

<style></style>

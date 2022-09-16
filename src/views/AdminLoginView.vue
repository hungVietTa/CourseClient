<template>
    <div class="login">
        <LoginComp />
    </div>
</template>
<script>
import LoginComp from "../components/LoginComp.vue"
import { mapActions } from "vuex";

export default {
    data() {
    return {
      showPassword: false,
      passwordToggle: false,
      form: {
        email: {
          value: "",
          valid: true,
          message: "",
        },
        password: {
          value: "",
          valid: true,
          message: "",
        }
      },
    };
  },
  methods: {
    ...mapActions(["validator",'login']),
    print() {
      console.log(this.form.password.valid);
    },
  },
  components: {
    LoginComp
  },
}
</script>
<style scoped lang="scss">
.login {
  margin: auto;
  position: relative;
  margin-top: 50px;
  
  .login-logo {

  position: absolute;
  top:0;
  left: 50%;
  z-index: 9;
  transform: translateX(50%);
  transform: translateY(-50%);
  }
}
</style>
<template>
    <div class="login">
        <section class="login-section mt-5">
            <h3>Đăng nhập</h3>
            <form @submit.prevent="login(form)" class="login-form">
                <div class="form-item" :class="{ invalid: !form.email.valid }">
                    <label for="email">Email</label>
                    <div class="input-field">
                        <input type="text" name="email" placeholder="Email của bạn" v-model="form.email.value"
                            @focusout="
                              validator(['email', form.email.value]).then((res) => {
                                form.email.valid = res[0];
                                form.email.message = res[1];
                              })
                            " />
                    </div>
                    <span :class="{invisible:form.email.valid}">{{ form.password.message }}</span>
                </div>
                <div class="form-item" :class="{ invalid: !form.password.valid }">
                    <label for="password">Mật khẩu</label>
                    <div class="input-field">
                        <input :type="showPassword?'text':'password'" name="password" placeholder="Mật khẩu của bạn"
                            v-model="form.password.value" @focusout="
                              validator([
                                'password',
                                form.password.value
                              ]).then((res) => {
                                form.password.valid = res[0];
                                form.password.message = res[1];
                              })
                            " />
                        <span @click="showPassword=!showPassword">
                            <font-awesome-icon icon="fa-solid fa-eye" />
                        </span>
                    </div>
                    <span :class="{invisible:form.password.valid}">{{ form.password.message }}</span>
                </div>
                <input type="submit" class="btn btn-primary" value="Đăng nhập" />
            </form>
        </section>
    </div>
</template>
<script>
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
  }
}
</script>
<style scoped lang="scss">
.login {
  .login-section {
    .login-form {
      width: 800px;
      margin: auto;
      .form-item {
        margin-bottom: 20px;

        label {
          display: block;
        }
        .input-field {
          width: 400px;
          border: 1px solid #ddd;
          border-radius: 12px;
          margin: auto;
          display: flex;
          justify-content: space-between;
          padding: 5px 10px;
          align-items: center;

          input {
            border: none;
            outline: none;
            flex-grow: 4;
          }
          span {
            cursor: pointer;
          }
        }
      } 
        span {
          display: block;
          height: 20px;
        }
        span.invisible {
          visibility: hidden;
        }
      .form-item.invalid {
        .input-field {
          border: 1px solid rgb(233, 93, 93);
          input {
            color: rgb(233, 93, 93);
          }
        }
        span {
          color: rgb(233, 93, 93);
        }
      }
    }
  }
}
</style>
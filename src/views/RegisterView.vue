<template>
  <div class="register">
    <HeaderView />
    <section class="register-section mt-5">
      <h3>
        Bắt đầu hành trình của bạn
        {{ form.fullName.valid }}
      </h3>
      <form class="register-form">
        <div class="form-item" :class="{ invalid: !form.fullName.valid }">
          <label for="fullName">Tên của bạn ?</label>
          <div class="input-field">
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              v-model="form.fullName.value"
              @focusout="
                validator(['name', form.fullName.value]).then((res) => {
                  form.fullName.valid = res[0];
                  form.fullName.message = res[1];
                })
              "
            />
          </div>
          <span v-if="!form.fullName.valid">{{ form.fullName.message }}</span>
        </div>
        <div class="form-item" :class="{ invalid: !form.email.valid }">
          <label for="email">Email</label>
          <div class="input-field">
            <input
              type="text"
              name="email"
              placeholder="Email của bạn"
              v-model="form.email.value"
              @focusout="
                validator(['email', form.email.value]).then((res) => {
                  form.email.valid = res[0];
                  form.email.message = res[1];
                })
              "
            />
          </div>
          <span v-if="!form.email.valid">{{ form.email.message }}</span>
        </div>
        <div class="form-item" :class="{ invalid: !form.password.valid }">
          <label for="password">Mật khẩu</label>
          <div class="input-field">
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu của bạn"
              v-model="form.password.value"
              @focusout="
                validator([
                  'password',
                  form.password.value,
                  form.confirmPassword.value,
                ]).then((res) => {
                  form.password.valid = res[0];
                  form.password.message = res[1];
                  form.confirmPassword.valid = res[2] && passwordToggle;
                  form.confirmPassword.message = res[3];
                })
              "
            />
            <font-awesome-icon icon="fa-solid fa-eyes" />
          </div>
          <span v-if="!form.password.valid">{{ form.password.message }}</span>
        </div>
        <div
          class="form-item"
          :class="{ invalid: !form.confirmPassword.valid }"
        >
          <label for="confirmPassword">Xác nhận mật khẩu</label>
          <div class="input-field">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              v-model="form.confirmPassword.value"
              @focus="passwordToggle = true"
              @focusout="
                validator([
                  'confirm',
                  form.confirmPassword.value,
                  form.password.value,
                ]).then((res) => {
                  form.confirmPassword.valid = res[0];
                  form.confirmPassword.message = res[1];
                })
              "
            />
            <font-awesome-icon icon="fa-solid fa-user-secret" />
          </div>
          <span v-if="!form.confirmPassword.valid">{{
            form.confirmPassword.message
          }}</span>
        </div>
      </form>
      <button @click="print">CLICK</button>
    </section>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import HeaderView from "../components/HeaderView.vue";

export default {
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      passwordToggle: false,
      form: {
        fullName: {
          value: "",
          valid: true,
          message: "",
        },
        email: {
          value: "",
          valid: true,
          message: "",
        },
        password: {
          value: "",
          valid: true,
          message: "",
        },
        confirmPassword: {
          value: "",
          valid: true,
          message: "",
        },
      },
    };
  },
  methods: {
    ...mapActions(["validator"]),
    print() {
      console.log(this.form.password.valid);
    },
  },
  components: {
    HeaderView,
  },
};
</script>
<style scoped lang="scss">
.register {
  .register-section {
    .register-form {
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

          input {
            border: none;
            outline: none;
            flex-grow: 4;
          }
        }
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
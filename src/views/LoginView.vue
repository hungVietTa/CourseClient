<template>
    <div class="login">
        <HeaderView />
        <section class="login-section mt-5">
            <h3>Đăng nhập</h3>
            <form class="login-form">
                <div class="form-item">
                    <label for="email">Email</label><input type="text" name="email" placeholder="Email của bạn"><br/>
                </div>
                <div class="form-item">
                    <label for="password">Mật khẩu</label><input type="password" name="password" placeholder="Mật khẩu của bạn"><br/>
                </div>
            </form>
        </section>
    </div>
</template>
<script>
    import HeaderView from "../components/HeaderView.vue"

    export default {
        components:{
            HeaderView
        }
    }
</script>
<style scoped lang="scss">
.login {

    .login-section {

        .login-form {

            .form-item {
                    margin-bottom :20px;
                    label {
                        display:block
                    }
                    input {
                        padding: 5px 10px;
                        border-radius: 12px;
                        width: 300px;
                    }
            }
        }
    }
}
</style>
<template>
  <header id="header">
    <nav class="navbar">
      <div class="container-fluid flex-nowrap">
        <router-link to="/" class="navbar-brand" href="#">
          <h3>Home page</h3>
        </router-link>
        <router-link to="/admin" class="navbar-brand me-auto" href="#">
          <h3>Admin page</h3>
        </router-link>
        <router-link to="/user" class="navbar-brand me-auto" href="#">
          <h3>User page</h3>
        </router-link>
        <div class="nav-interact">
          <router-link v-if="!$store.state.isAdminLogin&&$route.path!='/admin/login'" to="/admin/login" class="btn btn-primary me-3">Login</router-link>
          <button v-if="$store.state.isAdminLogin" @click="logout" class="btn btn-primary">Logout</button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "HeaderView",
  methods:{
    ...mapActions(['logout'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#header {
  padding-top: 5px;
  padding-bottom: 5px;
  box-shadow: 2px 0px 0px 2px rgba(9,9,9,0.1);

  .navbar {
    display: flex;
    padding: 0;

    .navbar-brand {
      color:#02424f ;
      padding: 0;
      width: 300px;

      span {
        letter-spacing: 2px;
      }
    }

    .navbar-collapse {
      display: flex;

      .navbar-nav {
        display: flex;
        flex-direction: row;

        .nav-item {
          padding: 0 10px;
        }

          .nav-link {
            margin: 0;
          }
      }
      .nav-form {
        margin-left: auto;
        margin-right: 40px;
      }
    }
    .nav-interact {
      display: flex;
      width: 300px;
    }
  }
}
</style>
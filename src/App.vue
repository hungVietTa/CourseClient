<template>
  <div id="app">
    <div class="waiting" v-if="!$store.state.loadingFinished">
      <button class="btn btn-primary" type="button" disabled>
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    </div>
    <main>
      <router-view />
    </main>
    <FooterComp />
  </div>
</template>
<script>
import FooterComp from "./components/Others/FooterComp.vue";

export default {
  components: { FooterComp }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
:root {
  --primary: #06bbcc;
  --light: #f0fbfc;
  --dark: #181d38;
}
.btn-primary {
  --bs-btn-bg: #06bbcc !important;
  --bs-btn-border-color: #06bbcc !important;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #06bbcc !important;
    --bs-btn-hover-border-color: #06bbcc !important;
    --bs-btn-focus-shadow-rgb: #06bbcc !important;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #06bbcc !important;
    --bs-btn-active-border-color: #06bbcc !important;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}
div .text-primary {
  color: #06bbcc !important;
}
.btn-primary:hover {
  opacity: 0.8;
}
nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.router-view-css {
  min-height: 500px;
}
.waiting {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: white;
  z-index: 99;
  right: 0;
  .btn {
    display: block;
    margin: auto;
    margin-top: 300px;
  }
}
div input[type="radio"]:focus {
  box-shadow: none;
}
</style>

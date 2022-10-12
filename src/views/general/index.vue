<template>
  <div class="home">
    <HeaderComponent ref="header" />
    <router-view></router-view>
    <FooterComponent/>
  </div>
</template>

<script>
import HeaderComponent from "@/components/general/header/HeaderComponent.vue";
import FooterComponent from "@/components/others/FooterComponent.vue";


  export default {
    data(){
      return {

      }
    },
  components: {
    HeaderComponent,
    FooterComponent
}

  }
</script>
<style>
main {
  margin: auto;
}
.header-container {
  width: 100%;
}
</style>


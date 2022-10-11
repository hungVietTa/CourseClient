<template>
  <div class="home">
    <HeaderComponent ref="header" />
    <main>
       <router-view></router-view>
    </main>
  </div>
</template>

<script>
import HeaderComponent from "@/components/general/header/HeaderComponent.vue";


  export default {
    data(){
      return {

      }
    },
  components: {
    HeaderComponent
}

  }
</script>
<style>
main {
  margin: auto;
  min-height: 400px;
}
.header-container {
  width: 100%;
}
</style>


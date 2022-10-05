<template>
  <div class="home">
    <HeaderComp ref="header" />
    <main>
       <router-view></router-view>
    </main>
  </div>
</template>

<script>
import HeaderComp from "@/components/Home/HeaderComp.vue";


  export default {
    data(){
      return {

      }
    },
  components: {
    HeaderComp
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


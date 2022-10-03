<template>
  <div class="home">
    <HomeHeaderComp ref="header" />
    <main>
       <router-view></router-view>
    </main>
  </div>
</template>

<script>
import HomeHeaderComp from "@/components/HomeHeaderComp.vue";

  export default {
    data(){
      return {

      }
    },
  components: {
    HomeHeaderComp,
  }

  }
</script>
<style>
main {
  width: 1200px;
  margin: auto;
  min-height: 400px;
}
</style>


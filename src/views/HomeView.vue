<template>
  <div class="home">
    <HeaderComp ref="header" />
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";

  export default {
    data(){
      return {

      }
    },
  components: {
    HeaderComp,
  }

  }
</script>


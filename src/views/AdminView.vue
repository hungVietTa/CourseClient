<template>
  <div>
    <div class="admin">
      <NavbarComp v-if="!($route.path == '/admin/login')" />
      <router-view :role="adminRole"></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavbarComp from "@/components/Admin/NavbarComp.vue";

export default {
  data() {
    return {
      adminRole: "admin",
    };
  },
  name: "HomeView",
  components: {
    NavbarComp,
  },
  methods:{
  },
  mounted(){},
};
</script>
<style lang="scss" scoped>
</style>
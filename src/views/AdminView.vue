<template>
  <div>
    <div class="admin">
      <AdminHeaderComp />
      <AdminSidebarComp v-if="!($route.path == '/admin/login')" />
      <router-view :role="adminRole"></router-view>
       <FooterComp />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminHeaderComp from "@/components/Admin/HeaderComp.vue";
import AdminSidebarComp from "@/components/Admin/SidebarComp.vue";
import FooterComp from "../components/Others/FooterComp.vue";

export default {
  data() {
    return {
      adminRole: "admin",
    };
  },
  name: "HomeView",
  components: {
    AdminHeaderComp,
    AdminSidebarComp,
    FooterComp
  },
  methods:{
  },
  mounted(){},
};
</script>
<style lang="scss" scoped>
</style>
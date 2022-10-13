<template>
  <div>
    <div class="admin">
      <NavbarComponent v-if="!($route.path == '/admin/login')" />
      <main :class="{open:!$store.state.admin.showSidebar||$route.path == '/admin/login'}">
        <router-view :role="adminRole"></router-view>
      </main>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavbarComponent from "@/components/admin/navbar/NavbarComponent.vue";

export default {
  data() {
    return {
      adminRole: "admin",
    };
  },
  name: "HomeView",
  components: {
    NavbarComponent,
  },
  methods:{
  },
  mounted(){},
};
</script>
<style lang="scss">
@import "@/assets/styles/admin/admin_crud.scss";
</style>
<style lang="scss" scoped>
  main {
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 250px;
    transition: 0.5s;
  }
  main.open{
    margin-left: 0;
  }
</style>
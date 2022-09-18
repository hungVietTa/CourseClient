<template>
  <div class="admin">
    <HeaderAdminComp/>
    <AdminSidebarComp v-if="!($route.path=='/admin/login')"/>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderAdminComp from '@/components/HeaderAdminComp.vue';
import AdminSidebarComp from '@/components/AdminSidebarComp.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderAdminComp,AdminSidebarComp
},
mounted(){
  console.log(this.$route)
}
}
</script>
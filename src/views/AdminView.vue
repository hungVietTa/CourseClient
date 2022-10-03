<template>
  <div class="admin">
    <AdminHeaderComp/>
    <AdminSidebarComp v-if="!($route.path=='/admin/login')"/>
    <router-view :role="adminRole"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminHeaderComp from '@/components/Admin/HeaderComp.vue';
import AdminSidebarComp from '@/components/Admin/SidebarComp.vue';

export default {
  data(){
    return {
      adminRole:"admin"
    }
  },
  name: 'HomeView',
  components: {
    AdminHeaderComp,AdminSidebarComp
},
mounted(){
  
}
}
</script>
<template>
  <div class="admin">
    <HeaderAdminComp/>
    <SidebarAdminComp/>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderAdminComp from '@/components/HeaderAdminComp.vue';
import SidebarAdminComp from '@/components/SidebarAdminComp.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderAdminComp,SidebarAdminComp
}
}
</script>
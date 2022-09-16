<template>
  <div class="home">
    <HeaderComp/>
    <SidebarUserComp/>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderComp from '@/components/HeaderComp.vue';
import SidebarUserComp from '@/components/SidebarUserComp.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderComp,SidebarUserComp
}
}
</script>

<template>
  <div class="home">
    <HomeHeaderComp/>
    <main>
      <UserSidebarComp/>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeHeaderComp from '@/components/Home/HeaderComp.vue';
import UserSidebarComp from '@/components/User/SidebarComp.vue';

export default {
  name: 'HomeView',
  components: {
    HomeHeaderComp,UserSidebarComp
}
}
</script>
<style>
main {
  max-width: 1300px;
  margin: auto;
  display: flex;
}
</style>

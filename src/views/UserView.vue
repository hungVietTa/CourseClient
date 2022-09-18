<template>
  <div class="home">
    <HeaderComp/>
    <main>
      <UserSidebarComp/>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderComp from '@/components/HeaderComp.vue';
import UserSidebarComp from '@/components/UserSidebarComp.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderComp,UserSidebarComp
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

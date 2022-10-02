<template>
  <aside id="aside">
    <nav class="sidebar">
      <div class="container-fluid flex-nowrap">
            <ul class="main-list">
                <li>Dashboard</li>
                <li><router-link to="/admin/schedules">schedules</router-link></li>
                <li><router-link to="/admin/courses">courses</router-link></li>
                <li><router-link to="/admin/lessons">lessons</router-link></li>
                <li><router-link to="/admin/quizs">quizs</router-link></li>
                <li><router-link to="/admin/blogs">blogs</router-link></li>       
            </ul>
      </div>
    </nav>
  </aside>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "HeaderView",
  methods:{
    ...mapActions(['logout'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#aside {
    position: fixed;
    width: 300px;
    left: 0;
    top: 50px;
    bottom: 0;    
}
</style>
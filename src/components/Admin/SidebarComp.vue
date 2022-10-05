<template>
  <aside>
    <nav class="sidebar">
      <div class="container-fluid flex-nowrap">
            <ul class="main-list">
                <li><router-link to="/admin/dashboard">Dashboard</router-link></li>
                <li><router-link to="/admin/schedules">Schedules</router-link></li>
                <li><router-link to="/admin/courses">Courses</router-link></li>
                <li><router-link to="/admin/lessons">Lessons</router-link></li>
                <li><router-link to="/admin/quizs">Quizs</router-link></li>
                <li><router-link to="/admin/blogs">Blogs</router-link></li>       
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
aside {
    // position: fixed;
    // width: 300px;
    // left: 0;
    // top: 50px;
    // bottom: 0;   
    // z-index: 9; 
}
aside ul {
  display: flex;
  gap: 30px;
  list-style: none;
  box-shadow: 1px 1px 1px 1px rgba(4,4,4,0.2);
}
a {
  color: salmon;
  text-decoration: none;
  font-size: 26px;
  font-weight: bold;
}

</style>
<template>
  <aside>
    <nav class="sidebar">
      <div class="container-fluid flex-nowrap">
            <ul class="main-list">
                <li>Dashboard</li>
                <li>Danh sách khóa học</li>
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
.aside {
    position: fixed;
    top
    .sidebar {
        .main-list{
            text-decoration: none;
        }
    }
        
}
</style>
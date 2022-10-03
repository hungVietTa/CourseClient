<template>
  <div class="wrapper">
    <h1>blogs</h1>
    <table>
      <tr>
        <th>Index</th>
        <th>ID</th>
        <th>Title</th>
        <th>Tag</th>
        <th>Category</th>
        <th>Comment</th>
        <th>Date Created</th>
        <th>Date Modified</th>
        <th>Delete</th>
      </tr>
      <tr v-for="(blog, index) in blogs" :key="index">
        <td>{{ index }}</td>
        <td>{{ blog.id }}</td>
        <td>{{ blog.title }}</td>
        <td>{{ blog.tag }}</td>
        <td>{{ blog.category }}</td>
        <td>{{ blog.comments }}</td>
        <td>{{ blog.date_created }}</td>
        <td>{{ blog.date_modified }}</td>
        <td><button>Delete</button></td>
      </tr>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      load: false,
      currentIndex: 0,
      blogFormShow: false,
      blogs: [],
    };
  },
  methods: {
    delete() {},
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.blogs.push({
        id:100+1,
        title: "Talk about ...",
        user:"Joe Doe",
        tag:"framework",
        category:"Backend",
        date_created:"22-12-2021",
        date_modified:"29-02-2022",
        comments:4
      });
    }
    this.load = true;
  },
};
</script>
<style scoped>
.wrapper {
  width: 1200px;
  margin: auto;
}
table {
  width: 1200px;
  margin: auto;
}
table td {
  height: 80px;
  position: relative;
}
table img {
  width: 80px;
  height: 40px;
  display: block;
}
table img:hover {
  position: absolute;
  width: 300px;
  height: 200px;
  top: 0;
  z-index: 2;
}
.form-wrapper {
  position: fixed;
  width: 200px;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: white;
}
</style>

<template>
    <div>
      <h1>Blog</h1>
      <ul class="blogs">
        <li v-for="(blog,index) in blogs" :key="index">
          <h3>name: {{ blog.name }}</h3>
          <p>des : {{ blog.des }}</p>
          <img :src="blog.img" alt="" />
        </li>
        <li>
          <div>
            <button @click="blogFormShow = true">Add new blog</button>
          </div>
        </li>
      </ul>
       <form class="blog-form" @submit.prevent="addBlog" v-if="blogFormShow">
      <label>Name: <input type="text" v-model="newBlog.name" /></label>
      <label>Description: <input type="text" v-model="newBlog.des" /></label>
      <label>Image: <input type="text" v-model="newBlog.img" /></label>
      <button type="submit">Add</button>
    </form>
    </div>
</template>
<script>
export default {
    data(){
        return {
        newBlog: {
        name: "",
        des: "",
        img: "",
      },
      blogFormShow: false,
      blogs: [
        {
          name: "1",
          des: "HTML CSS TAILWIND",
          img: "https://i.ytimg.com/vi/-VQhSM77_HA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLClX8lFY0T_TGnFgurbmgkujJO61w",
        },
        {
          name: "2",
          des: "JS NODEJS",
          img: "https://i.ytimg.com/vi/Oe421EPjeBE/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCXCkN1Cu4rFO_0Z0kFmQTe1-xRJQ",
        },
      ],
        }
    },
    methods:{
        addBlog() {
      this.blogs.push(this.newBlog);
    }
    }

}
</script>
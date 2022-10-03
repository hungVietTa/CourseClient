<template>
  <div class="wrapper">
    <h1>Lessons</h1>
    <div class="text-start mb-2"><button @click="lessonFormShow=true;action='Add'">Add new lesson</button></div>
    <table>
      <tr>
        <th>Index</th>
        <th>ID</th>
        <th>title</th>
        <th>Description</th>
        <th>Image</th>
        <th>Video</th>
        <th>Tag</th>
        <th>Category</th>
        <th>Duration</th>
        <th>In Courses</th>
        <th>Date Created</th>
        <th>Date Modified</th>
        <th>Modify</th>
        <th>Delete</th>
      </tr>
      <tr v-for="(lesson, index) in lessons" :key="index">
        <td>{{index}}</td>
        <td>{{ lesson.id }}</td>
        <td>{{ lesson.title }}</td>
        <td>{{ lesson.description }}</td>
        <td><img :src="lesson.img" alt="" /></td>
        <td>{{ lesson.video }}</td>
        <td>{{ lesson.tag }}</td>
        <td>{{ lesson.category }}</td>
        <td>{{ lesson.duration }}</td>
        <td><span v-for="(id,index) in lesson.courses_id" :key="index">{{id}} </span></td>
        <td>{{ lesson.date_created }}</td>
        <td>{{ lesson.date_modified }}</td>
        <td><button @click="modifyAction(index)">Modify</button></td>
        <td><button>Delete</button></td>
      </tr>
    </table>
    <div class="form-wrapper" v-if="lessonFormShow&&load">
      <h4>Lesson {{lessons[currentIndex].id}} </h4>
      <p>{{lessons[currentIndex].title}}</p>
      <form  
        class="lesson-form"
        @submit.prevent="addLesson"
      >
        <label>Title: <input type="text" v-model="newLesson.title" /></label>
        <label
          >Description: <input type="text" v-model="newLesson.des"
        /></label>
        <label>Image: <input type="text" v-model="newLesson.img" /></label>
        <label>Video: <input type="text" v-model="newLesson.video" /></label>
        <label>Tag: <input type="text" v-model="newLesson.tag" /></label>
        <label
          >Category: <input type="text" v-model="newLesson.category"
        /></label>
        <button type="submit">{{action}}</button>
        <button @click="lessonFormShow=false">Cancel</button>
      </form>
    </div>
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
      action:"",
      load:false,
      currentIndex:0,
      newLesson: {
        title: "",
        desription: "",
        img: "",
        video: "",
        tag: "",
        category: ""
      },
      lessonFormShow: false,
      lessons: [],
    };
  },
  methods: {
    modifyAction(index){
      this.lessonFormShow=true
      this.currentIndex=index
      this.action='Modify'
      this.newLesson = this.lessons[this.currentIndex]
    },
    add() {
      
    },
    modify(){

    },
    delete(){

    }
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.lessons.push({
        id: i + 1,
        title: "Default",
        desription: "HTML CSS TAILWIND",
        img: "https://i.ytimg.com/vi/-VQhSM77_HA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLClX8lFY0T_TGnFgurbmgkujJO61w",
        video: "aaa",
        tag: "framework",
        category: "frontEnd",
        duration:123,
        date_created:"11-02-2022",
        date_modified:"11-04-2022",
        courses_id:[223,203]
      });
    }
    this.load = true
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
  top:0;
  bottom: 0;
  border: 1px solid #333;
  padding-left: 20px;
  width: 300px;
}
</style>
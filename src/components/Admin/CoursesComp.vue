<template>
  <div class="wrapper">
    <h1>Courses</h1>
    <div class="text-start mb-2"><button @click="courseFormShow=true;action='Add'">Add new course</button></div>
    <table>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Desription</th>
        <th>Image</th>
        <th>Tag</th>
        <th>Category</th>
        <th>Date Created</th>
        <th>Date Modified</th>
        <th>Modify</th>
        <th>Delete</th>
      </tr>
      <tbody v-for="(course, index) in courses" :key="index">
        <tr>
          <td>{{ course.id }}</td>
          <td>{{ course.title }}</td>
          <td>{{ course.desription }}</td>
          <td><img :src="course.img" alt="" /></td>
          <td>{{ course.tag }}</td>
          <td>{{ course.category }}</td>
          <td>{{ course.date_created }}</td>
          <td>{{ course.date_modified }}</td>
          <td>
            <router-link
              :to="$route.path+'/modify'"
            >
              Modify
            </router-link>
          </td>
          <td><button>Delete</button></td>
        </tr>
        <tr>
          <td rowspan="0">
            <ul v-for="(lesson, index) in course.lessons" :key="index">
              <li class="lesson">
                <p>{{ lesson.id }}</p>
                <p>{{ lesson.title }}</p>
                <p>{{ lesson.category }}</p>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="form-wrapper" v-if="courseFormShow && load">
      <p>{{ newCourse.title }}</p>
      <form class="Course-form" @submit.prevent="addCourse">
        <label
          >title: <input type="text" v-model="newCourse.title"
        /></label>
        <label
          >Desriptioncription: <input type="text" v-model="newCourse.desription"
        /></label>
        <label
          >Image: <input type="text" v-model="newCourse.img"
        /></label>
        <label
          >Video: <input type="text" v-model="newCourse.video"
        /></label>
        <label
          >Tag: <input type="text" v-model="newCourse.tag"
        /></label>
        <label
          >Category:
          <input type="text" v-model="newCourse.category"
        /></label>
        <button type="submit">{{action}}</button>
        <button @click="courseFormShow=false">Cancel</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      load: false,
      currentIndex: 0,
      newCourse: {
        title: "",
        desription: "",
        img: "",
        lessons:[],
        tag: "framework",
        category: "frontEnd",
      },
      courseFormShow: false,
      courses: [],
      lessons: []
    };
  },
  methods: {
    modifyAction(index){
      this.courseFormShow=true
      this.currentIndex=index
      this.action='Modify'
      this.newCourse = this.courses[this.currentIndex]
    },
    add() {},
    modify() {},
    delete() {},
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.courses.push({
        id: i + 1,
        title: "Default",
        desription: "HTML CSS TAILWIND",
        img: "https://i.ytimg.com/vi/-VQhSM77_HA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLClX8lFY0T_TGnFgurbmgkujJO61w",
        lessons: this.lessons,
        tag: "framework",
        category: "frontEnd",
        schedules_id:[1,3],
        date_created: "11-02-2022",
        date_modified: "11-04-2022",
        quiz:[]
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
  border: 1px solid #333;
  padding-left: 20px;
  width: 300px;
}
.lesson {
  display: flex;
}
</style>
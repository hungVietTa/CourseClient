<template>
    <div>
      <h1>Courses</h1>
      <ul class="courses">
        <li v-for="(course, index) in courses" :key="index">
          <h3>name: {{ course.name }}</h3>
          <p>des : {{ course.des }}</p>
          <img :src="course.img" alt="" />
        </li>
        <li>
          <div>
            <button @click="courseFormShow = true">Add new course</button>
          </div>
        </li>
      </ul>
     <div class="course-modify">
       <h4>Course: {{courses[currentCourse].name}}</h4>
       <form
      @submit.prevent="addCourse"
      v-if="courseFormShow"
      >
      <label>Name: <input type="text" v-model="newCourse.name" /></label>
      <label>Description: <input type="text" v-model="newCourse.des" /></label>
      <label>Image: <input type="text" v-model="newCourse.img" /></label>
      <label>Tag: <input type="text" v-model="newCourse.tag" /></label>
      <label>Category: <input type="text" v-model="newCourse.category"/></label>
      <button type="submit">Add</button>
    </form>
     <div class="lesson-update">
      <li v-for="(lesson,index) in courses[currentCourse].lessons" :key="index">
        <p>{{lesson.name}}</p>
      </li>
    </div>
    </div>
     </div>
</template>
<script>
export default {
  data() {
    return {
      currentCourse: 0,
      newCourse: {
        name: "",
        des: "",
        img: "",
        tag: "",
        category: "",
      },
      courseFormShow: false,
      courses: [
        {
          name: "1",
          des: "HTML CSS TAILWIND",
          img: "https://i.ytimg.com/vi/-VQhSM77_HA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLClX8lFY0T_TGnFgurbmgkujJO61w",
          tag: "",
          category: "",
          lessons: [
            {
              name: "Lession1",
            },
            {
              name: "Lession2",
            },
          ],
        },
        {
          name: "2",
          des: "JS NODEJS",
          img: "https://i.ytimg.com/vi/Oe421EPjeBE/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCXCkN1Cu4rFO_0Z0kFmQTe1-xRJQ",
          tag: "",
          category: "",
          lessons: [
            {
              name: "LessionA",
            },
            {
              name: "LessionB",
            },
          ],
        },
      ],
    };
  },
  methods: {
    addCourse() {
      this.courses.push(this.newCourse);
    },
  },
};
</script>
<style scoped>
.course-modify {
  position: fixed;
  width: 200px;
  right: 0;
  bottom: 0;
  top: 0;
}
</style>
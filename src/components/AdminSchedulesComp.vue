<template>
  <div>
    <div>
      <div>
        <h1>Schedule {{$route.paramater}}</h1>
        <ul class="schedules">
          <li v-for="(course, index) in courses" :key="index">
            <h3>name: {{ course.name }}</h3>
            <p>des : {{ course.des }}</p>
            <img :src="course.img" alt="" />
          </li>
          <li>
            <div>
              <button @click="courseFormShow = true">Add new schedule</button>
            </div>
          </li>
        </ul>
        <form
          class="course-form"
          @submit.prevent="addCourse"
          v-if="courseFormShow"
        >
          <label>Name: <input type="text" v-model="newCourse.name" /></label>
          <label
            >Description: <input type="text" v-model="newCourse.des"
          /></label>
          <label>Image: <input type="text" v-model="newCourse.img" /></label>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        newCourse:{
            name:'',
            des:'',
            img:''
        },
        courseFormShow:false,
      courses: [
        {
          name: "HTML",
          des: "HTML is ....",
          img: "https://i.ytimg.com/vi/R6plN3FvzFY/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCJ7GkmVcmAg6KPKaAPAX0DyTnCvw",
        },
        {
          name: "CSS",
          des: "CSS is ....",
          img: "https://i.ytimg.com/vi/qIewm54rTF4/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBeZCK22PAf49_aIPk4deOrq5eqOQ",
        },
      ],
    };
  },
  methods:{
    addCourse() {
      this.courses.push(this.newCourse);
    },
  }
};
</script>
<style scoped>
ul {
  display: flex;
}
img {
  width: 200px;
  height: 130px;
}
</style>
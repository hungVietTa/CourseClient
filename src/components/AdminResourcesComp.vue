<template>
  <div>
    <!-- <ul>
            <li v-for="(item,index) in list" :key="index" >
                <p>Title : {{item.snippet.title}}</p>
                <p><img :src="item.snippet.thumbnails.default.url" alt=""></p>
                <p>Title : {{item.snippet.description}}</p>
                 <p>Title : {{item.snippet.position}}</p>
            </li>
        </ul> -->

    <!-- /SCHEDULE -->
    <div>
      <h1>Schedules</h1>
      <ul class="schedules">
        <li v-for="(schedule, index) in schedules" :key="index">
          <h3>name: {{ schedule.name }}</h3>
          <p>des : {{ schedule.des }}</p>
          <img :src="schedule.img" alt="" />
        </li>
        <li>
          <div>
            <button @click="scheduleFormShow = true">Add new schedule</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- COURSES -->
    <div>
      <h1>Courses</h1>
      <ul class="courses">
        <li v-for="(schedule, index) in schedules" :key="index">
          <h3>name: {{ schedule.name }}</h3>
          <p>des : {{ schedule.des }}</p>
          <img :src="schedule.img" alt="" />
        </li>
        <li>
          <div>
            <button @click="scheduleFormShow = true">Add new course</button>
          </div>
        </li>
      </ul>
    </div>
    <!-- LESSON -->
    <div>
      <h1>Courses</h1>
      <ul class="courses">
        <li v-for="(lesson, index) in lessons" :key="index">
          <h3>name: {{ lesson.name }}</h3>
          <p>des : {{ lesson.des }}</p>
          <img :src="lesson.img" alt="" />
        </li>
        <li>
          <div>
            <button @click="lessonFormShow = true">Add new lesson</button>
          </div>
        </li>
      </ul>
    </div>
    <!-- QUIZ -->
    <div>
      
    </div>
    <!-- BLOG -->
    
    <!-- SCHEDULE FORM -->
    <form
      class="schedule-form"
      @submit.prevent="addSchedule"
      v-if="scheduleFormShow"
    >
      <label>Name: <input type="text" v-model="newSchedule.name" /></label>
      <label
        >Description: <input type="text" v-model="newSchedule.des"
      /></label>
      <label>Image: <input type="text" v-model="newSchedule.img" /></label>
      <button type="submit">Add</button>
    </form>

    <!-- COURSES FORM -->
    <form
      class="courses-form"
      @submit.prevent="addCourse"
      v-if="courseFormShow"
    >
      <label>Name: <input type="text" v-model="newCourses.name" /></label>
      <label>Description: <input type="text" v-model="newCourses.des" /></label>
      <label>Image: <input type="text" v-model="newCourses.img" /></label>
      <button type="submit">Add</button>
    </form>
    <!-- LESSON FORM -->
    <form class="lesson-form" @submit.prevent="addLesson" v-if="lessonFormShow">
      <label>Name: <input type="text" v-model="newLesson.name" /></label>
      <label>Description: <input type="text" v-model="newLesson.des" /></label>
      <label>Image: <input type="text" v-model="newLesson.img" /></label>
      <button type="submit">Add</button>
    </form>
     <!-- QUIZ FORM -->
    <form class="quiz-form" @submit.prevent="addQuiz" v-if="quizFormShow">
      <label>Name: <input type="text" v-model="newQuiz.name" /></label>
      <label>Description: <input type="text" v-model="newQuiz.des" /></label>
      <label>Image: <input type="text" v-model="newQuiz.img" /></label>
      <button type="submit">Add</button>
    </form>
     <!-- BLOG FORM -->
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
  data() {
    return {
      newSchedule: {
        name: "",
        des: "",
        img: "",
      },
      scheduleFormShow: false,
      schedules: [
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
      //   COURSE
      newcourse: {
        name: "",
        des: "",
        img: "",
      },
      courseFormShow: false,
      courses: [
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
      //   LESSON
      newLesson: {
        name: "",
        des: "",
        img: "",
      },
      lessonFormShow: false,
      lessons: [
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
       //   QUIZ
      newQuiz: {
        name: "",
        des: "",
        img: "",
      },
      quizFormShow: false,
      quizs: [
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
       //   BLOG
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
    };
  },
  methods: {
    addSchedule() {
      this.schedules.push(this.newSchedule);
    },
    addCourse() {
      this.courses.push(this.newCourse);
    },
    addLesson() {
      this.lessons.push(this.newLesson);
    },
    addQuiz() {
      this.quizs.push(this.newQuiz);
    },
    addBlog() {
      this.blogs.push(this.newBlog);
    },
  },
  mounted() {
    // this.axios.get('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=PLm8ctt9NhMNV75T9WYIrA6m9I_uw7vS56&key=AIzaSyApn2HB5U_StzHWNmyVb37etPSkji7b94c').then(res=>this.list=res.data.items).catch(err=>console.log(err))
  },
};
</script>
<style scoped>
ul {
  display: flex;
}
img {
  width: 120px;
  height: 90px;
}
</style>

<template>
  <div>
    <h1>Lessons</h1>
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
    <div class="form-wrapper">
      <form
        class="lesson-form"
        @submit.prevent="addLesson"
        v-if="lessonFormShow"
      >
        <label>Name: <input type="text" v-model="newLesson.name" /></label>
        <label
          >Description: <input type="text" v-model="newLesson.des"
        /></label>
        <label>Image: <input type="text" v-model="newLesson.img" /></label>
        <label>Video: <input type="text" v-model="newLesson.video" /></label>
        <label>Tag: <input type="text" v-model="newLesson.tag" /></label>
        <label>Category: <input type="text" v-model="newLesson.category" /></label>
        <button type="submit">Add</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newLesson: {
        name: "",
        des: "",
        img: "",
        video:'',
        tag:'',
        category:'',
      },
      lessonFormShow: false,
      lessons: [
        {
          name: "1",
          des: "HTML CSS TAILWIND",
          img: "https://i.ytimg.com/vi/-VQhSM77_HA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLClX8lFY0T_TGnFgurbmgkujJO61w",
          video: "aaa",
          tag: "",
          category: "",
        },
        {
          name: "2",
          des: "JS NODEJS",
          img: "https://i.ytimg.com/vi/Oe421EPjeBE/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCXCkN1Cu4rFO_0Z0kFmQTe1-xRJQ",
          video: "aaa",
          tag: "",
          category: "",
        },
      ],
    };
  },
  methods: {
    addLesson() {
      this.lessons.push(this.newLesson);
    },
  },
};
</script>
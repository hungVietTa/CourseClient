<template>
  <div>
    <h1>Quizs</h1>
    <ul class="quizs">
      <li v-for="(quiz, index) in quizs" :key="index">
        <h3>name: {{ quiz.name }}</h3>
        <p>des : {{ quiz.des }}</p>
        <img :src="quiz.img" alt="" />
      </li>
      <li>
        <div>
          <button @click="quizFormShow = true">Add new quiz</button>
        </div>
      </li>
    </ul>
    <form class="quiz-form" @submit.prevent="addQuiz" v-if="quizFormShow">
      <label>Name: <input type="text" v-model="newQuiz.name" /></label>
      <label>Description: <input type="text" v-model="newQuiz.des" /></label>
      <label>Image: <input type="text" v-model="newQuiz.img" /></label>
      <button type="submit">Add</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
    };
  },
  methods: {
    addQuiz() {
      this.quizs.push(this.newQuiz);
    },
  },
};
</script>
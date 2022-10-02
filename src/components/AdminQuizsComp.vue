<template>
  <div class="wrapper">
    <h1>quizs</h1>
    <div class="text-start mb-2"><button @click="quizFormShow=true;action='Add'">Add new quiz</button></div>
    <table>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Desription</th>
        <th>Tag</th>
        <th>Category</th>
        <th>Date Created</th>
        <th>Date Modified</th>
        <th>Modify</th>
        <th>Delete</th>
      </tr>
      <tbody v-for="(quiz, index) in quizs" :key="index">
        <tr>
          <td>{{ quiz.id }}</td>
          <td>{{ quiz.title }}</td>
          <td>{{ quiz.desription }}</td>
          <td>{{ quiz.tag }}</td>
          <td>{{ quiz.category }}</td>
          <td>{{ quiz.date_created }}</td>
          <td>{{ quiz.date_modified }}</td>
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
            <ul v-for="(question, index) in quiz.questions" :key="index">
              <li class="question">
                <p>{{ question.id }}</p>
                <p>{{ question.title }}</p>
                <p>{{ question.category }}</p>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="form-wrapper" v-if="quizFormShow && load">
      <p>{{ newQuiz.title }}</p>
      <form class="quiz-form" @submit.prevent="addquiz">
        <label
          >title: <input type="text" v-model="newQuiz.title"
        /></label>
        <label
          >Desriptioncription: <input type="text" v-model="newQuiz.desription"
        /></label>

        <label
          >Tag: <input type="text" v-model="newQuiz.tag"
        /></label>
        <label
          >Category:
          <input type="text" v-model="newQuiz.category"
        /></label>
        <button type="submit">{{action}}</button>
        <button @click="quizFormShow=false">Cancel</button>
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
      newQuiz: {
        title: "",
        desription: "",
        tag: "framework",
        category: "frontEnd"
      },
      quizFormShow: false,
      quizs: [],
    };
  },
  methods: {
    modifyAction(index){
      this.quizFormShow=true
      this.currentIndex=index
      this.action='Modify'
      this.newQuiz = this.quizs[this.currentIndex]
    },
    add() {},
    modify() {},
    delete() {},
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.quizs.push({
        id: i + 1,
        title: "Default",
        desription: "HTML CSS TAILWIND",
        tag: "framework",
        category: "frontEnd",
        courses_id:[1,3],
        date_created: "11-02-2022",
        date_modified: "11-04-2022",
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
}
.question {
  display: flex;
}
</style>
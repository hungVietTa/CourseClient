<template>
  <div class="mt-3">
    <h2 class="fw-bold">Quiz#{{ course.id }}</h2>
    <div class="mb-4">
      <h3 class="fw-bold">Information</h3>
      <!-- INFORMATION FORM -->
      <div>
        <form @submit.prevent="add">
          <label class="w-100">Name:</label>
          <input class="w-100 mb-3" type="text" />
          <label class="w-100">Video URL:</label>
          <input class="w-100 mb-3" type="text" />
          <label>Description: </label>
          <textarea class="mb-2" type="text" col="5" rows="5"></textarea>
          <div class="d-flex mb-4">
            <label class="col-6"
              ><span>Date Created: </span
              ><input
                class="text-center"
                type="text"
                disabled
            /></label>
            <label class="col-6"
              ><span>Date Modified: </span
              ><input
                class="text-center"
                type="text"
                disabled
                 /></label
            ><br />
          </div>
          <div class="text-center">
            <button class="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
    <!-- QUESTIONS IN COURSES -->
    <div class="table-wrapper pt-3 border-top">
      <h4 class="fw-bold text-start mb-4">QUIZS</h4>
      <div class="text-start mb-4">
        <button class="btn btn-primary" @click="addForm = true">
          Add new question
        </button>
      </div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th colspan="4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              @keydown.prevent="keyPos($event, index)"
              v-for="(lesson, index) in lessons"
              :key="index"
              tabindex="0"
            >
              <td>{{ lesson.id }}</td>
              <td>{{ lesson.name }}</td>
              <td>{{ lesson.des }}</td>
              <td>
                <button
                  class="btn btn-secondary"
                  @click="up($event.target, index)"
                >
                  Up
                </button>
              </td>
              <td>
                <button
                  class="btn btn-secondary"
                  @click="down($event.target, index)"
                >
                  Down
                </button>
              </td>
              <td><button class="btn btn-primary">Edit</button></td>
              <td><button class="btn btn-danger">Remove</button></td>
            </tr>
          </tbody>
        </table>
        <div class="text-center">
          <button @click="modalShow = true" class="btn btn-primary mt-4 mb-3">
            Update
          </button>
        </div>
      </div>
      <!-- ADD QUESTION FORM -->
      <div class="overlay" v-if="addForm && load">
        <div class="form-popup">
          <h3 class="fw-bold">Add new question</h3>
          <form class="Course-form" @submit.prevent="add">
            <!-- QUESTION -->
            <label class="mb-2"
              >Question:
            </label>
            <textarea type="text" class="w-100 mb-3" v-model="questions[0].question"></textarea>
            <!-- ANSWERS -->
            <div class="mb-2">
              <label class="w-100" v-for="(answer, index) in questions[0].answers" :key="index"
                >{{ alphabet[index] }}
                <input
                  :value="questions[0].answers[index]"
                  v-model="questions[0].correct_answer"
                  name="modify-answer"
                  type="radio" 
                  />
                <input class="ms-2 border-0"  type="text" v-model="questions[0].answers[index]"
              /></label>
            </div>
            <!-- HINT LESSON -->
            <label
              >Hint lesson: <input type="text" v-model="questions[0].hint_lesson"
            /></label>
            <div class="text-end">
              <button class="btn btn-primary me-2" type="submit">Add</button>
              <button class="btn btn-secondary" @click="addForm= false">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- MODAL -->
    <ModalComponent
      v-if="modalShow"
      @cancel="modalShow = false"
      @process="updateCourse(currentId)"
    />
  </div>
</template>
<script>
import ModalComponent from "@/components/others/ModalComponent.vue";

export default {
  data() {
    return {
    // OBJECT
      question:{
        question:"",
        answers:[
          {
            content:"blah",
            is_true:0
          },
          {
            content:"blah",
            is_true:0
          }
        ]
      },
      // UI EFFECT
      modalShow: false,
      addForm: false,
      editForm: false,
      lessonsPool: [],
      course: {},
      newLesson: {
        name: "",
        des: "",
        img: "",
        video: "",
        tag: "",
        category: "",
      },
      rawLessons: [],
      // QUESTION
      alphabet:['A','B','C','D','E','F','G','H','I','K'],
      action: "",
      load: false,
      currentIndex: 0,
      newQuestion: {
        id: 0,
        lesson_id: "",
        title: "",
        answers: ["",""],
        tag: "",
        category: "",
      },
      questionFormShow: false,
      questions: [],
    };
  },
  computed: {
    lessons() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.rawLessons.sort((a, b) => a.position - b.position);
    },
  },
  methods: {
    // LESSONS ARRANGEMENT
    keyPos(event, index) {
      if (event.keyCode == 38) {
        if (index == 0) return;
        let temp;
        temp = this.lessons[index].position;
        this.lessons[index].position = this.lessons[index - 1].position;
        this.lessons[index - 1].position = temp;
        event.target.previousElementSibling.focus();
      } else if (event.keyCode == 40) {
        event.target.focus();
        if (index == this.lessons.length - 1) return;
        let temp;
        temp = this.lessons[index].position;
        this.lessons[index].position = this.lessons[index + 1].position;
        this.lessons[index + 1].position = temp;
        event.target.nextElementSibling.focus();
      }
    },
    up(target, index) {
      target.parentNode.parentNode.focus();
      if (index == 0) return;
      let temp;
      temp = this.lessons[index].position;
      this.lessons[index].position = this.lessons[index - 1].position;
      this.lessons[index - 1].position = temp;
      target.parentNode.parentNode.previousElementSibling.focus();
    },
    down(target, index) {
      target.parentNode.parentNode.focus();
      if (index == this.lessons.length - 1) return;
      let temp;
      temp = this.lessons[index].position;
      this.lessons[index].position = this.lessons[index + 1].position;
      this.lessons[index + 1].position = temp;
      target.parentNode.parentNode.nextElementSibling.focus();
    },
    // CALL API
    fetching() {
      // console.log(this.$route.params)
      // this.$store.dispatch("loadingFinishedFunc", false);
      let initialData = this.axios
        .get(`/api/v1/admin/courses/${this.$route.params.id}`)
        .then((res) => {
          this.course = res.data;
          this.load = true;
          console.log(res.data);
          // this.$store.dispatch("loadingFinishedFunc", true);
        })
        .catch((res) => {
          alert(res.response.data.error);
        });
      return initialData;
    },
    add() {
      this.axios
        .post("/api/v1/admin/courses", this.newCourse)
        .then(() => {
          this.newCourse.name = "";
          this.newCourse.description = "";
          this.fetching();
        })
        .catch(() => {
          alert("something wrong happen !");
        });
    },
    updateInfo() {
      console.log(this.$refs.imgInput.files);
      let formData = new FormData();
      formData.append("name", this.course.name);
      formData.append("description", this.course.description);
      formData.append("is_publish", this.course.is_publish);
      if (this.$refs.imgInput.files[0])
        formData.append("cover_file", this.$refs.imgInput.files[0]);
      this.axios
        .put(`/api/v1/admin/courses/${this.course.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.$refs.imgInput.value = "";
          this.fetching();
        })
        .catch(() => {
          alert("something wrong happen !");
        });
    },
    // OTHERS
  },
  components: {
    ModalComponent,
  },
  created() {
    // const getId = this.$route.params.id;
    // this.getId = this.$route.params.id;

    this.fetching();
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.questions.push({
        id: 0,
        lesson_id: 111+i,
        question: "What the heck ?",
        answers: ["Term","Service"],
        correct_answer:"Term",
        quiz_id:[2,3],
        tag: "Framework",
        category: "Frontend",
        date_created:"22-12-2020",
        date_modified:"22-12-2021",
      });
  }
}
};
</script>
   
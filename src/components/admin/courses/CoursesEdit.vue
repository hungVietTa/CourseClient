<template>
  <div class="mt-3" v-if="course">
    <h2 class="fw-bold text-center">Course #{{ course.id }}</h2>
    <!-- COURSES INFORMATION START-->
    <h4 class="fw-bold text-start">Information</h4>
    <div class="mb-4" v-if="course">
      <form class="course-form" @submit.prevent="modalCourseUpdate = true">
        <label class="w-100 mb-4">
          <span class="mb-2">Name:</span>
          <input class="w-100" type="text" v-model="course.name"
        /></label>
        <div class="form-body d-flex align-items-center">
          <div class="col-7 d-flex flex-column justify-content-between">
            <div class="d-flex mb-4">
              <div class="col-6">
                <label><span>Publish:</span></label
                ><br />
                <label class="fw-normal"
                  >Yes:
                  <input type="radio" :value="1" v-model="course.is_publish"
                /></label>
                <label class="ms-3 fw-normal"
                  >No:
                  <input
                    type="radio"
                    :value="0"
                    v-model="course.is_publish" /></label
                ><br />
              </div>
              <div class="col-6">
                <label
                  ><span>Category: </span><br/>
                  <select class="px-1 py-1 border-radius-6">
                    <option selected="true" disabled="disabled" hidden></option>
                    <option  v-for="category in categoriesData.categories" :key="category.id" >{{category.name}}</option>
                  </select>
                </label>
              </div>
            </div>
            <div class="d-flex mb-4">
              <label class="col-6"
                ><span>Date Created: </span><br /><input
                  type="text"
                  disabled
                  :value="course.created_at.split('T')[0]"
              /></label>
              <label class="col-6"
                ><span>Date Modified: </span><br /><input
                  type="text"
                  disabled
                  :value="course.updated_at.split('T')[0]" /></label
              ><br />
            </div>
            <div class="mb-4">
              <label><span>Description:</span> </label> <br />
              <textarea
                type="text"
                rows="5"
                v-model="course.description"
              ></textarea>
            </div>
          </div>
          <div class="col-5">
            <div class="cover-img mb-3">
              <img
                ref="image"
                :src="
                  course.cover
                    ? course.cover.file_url
                    : require('@/assets/img/functional/no_image.jpg')
                "
              />
            </div>
            <div class="text-center">
              <label class="mb-4 btn btn-secondary py-0">
                <p class="font-weight-normal m-0">Cover image</p>
                <input
                  class="border-0 custom-file-input"
                  ref="imgInput"
                  @change="imagePreview"
                  type="file"
                />
              </label>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button @click="modalUpdateShow = true" class="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
    <!-- COURSES INFROMATION END -->

    <!-- LESSONS LIST STARTS-->
    <div class="table-wrapper pt-3 border-top mb-4">
      <h4 class="fw-bold text-start mb-3">
        Lessons ({{course.lessons.length}})
      </h4>
      <div class="text-start mb-3">
        <router-link class="btn btn-primary" :to="$route.path + '/lessons/new'"
          >Add new lesson</router-link
        >
      </div>
      <div>
        <table class="table mb-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Views</th>
              <th colspan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(lesson, index) in lessonsData.lessons"
              :key="index"
              tabindex="0"
            >
              <td>{{ lesson.id }}</td>
              <td>{{ lesson.name }}</td>
              <td>{{ lesson.description }}</td>
              <td>{{ secondsToHms(parseInt(lesson.duration)) }}</td>
              <td>{{ lesson.view_count }}</td>
              <td>
                <router-link
                  :to="$route.path + `/lessons/${lesson.id}`"
                  class="btn btn-primary px-3 py-1"
                  >Edit</router-link
                >
              </td>
              <td>
                <button
                  @click="
                    modalLessonDelete = true;
                    currentLesson = lesson;
                  "
                  class="btn btn-danger px-3 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- PAGINATION START -->
      <div
        class="vue-pagination mb-4"
        v-if="lessonsData && lessonsData.meta.pages > 1"
      >
        <paginate
          v-model="currentLessonPage"
          :pageCount="lessonsData.meta.pages"
          :click-handler="lessonPaging"
        />
      </div>
      <!-- PAGINATION END -->
    </div>
     <!-- LESSONS LIST ENDS-->
      <!-- QUIZS LIST START -->
      <div class="table-wrapper pt-3 border-top" v-if="quizzesData">
        <h4 class="fw-bold text-start mb-4">QUIZS ({{quizzesData.meta.total}})</h4>
        <div class="text-start mb-4">
          <button class="btn btn-primary" @click="quizNewFormShow = true">
            Add new quiz
          </button>
        </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Time</th>
                <th>Lesson ID</th>
                <th colspan="4">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                @keydown.prevent="keyPos($event, index)"
                v-for="(quiz, index) in quizzesData.quizzes"
                :key="index"
                tabindex="0"
              >
                <td>{{ quiz.id }}</td>
                <td>{{ quiz.name }}</td>
                <td>{{ quiz.time }}</td>
                <td>{{ quiz.lesson_id }}</td>
                <td>
                  <router-link
                    :to="$route.path + `/quizzes/${quiz.id}`"
                    class="btn btn-primary px-3 py-1"
                    >Edit</router-link
                  >
                </td>
                <td>
                  <button
                    class="btn btn-danger"
                    @click="
                      modalQuizDelete = true;
                      currentQuiz = quiz;
                    "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- PAGINATION START -->
        <div
          class="vue-pagination mb-4"
          v-if="quizzesData && quizzesData.meta.pages > 1"
        >
          <paginate
            v-model="currentQuizPage"
            :pageCount="quizzesData.meta.pages"
            :click-handler="quizPaging"
          />
        </div>
        <!-- PAGINATION END -->

        <!-- ADD QUIZS FORM -->
        <div class="overlay" v-if="quizNewFormShow">
          <div class="form-popup">
            <h3 class="fw-bold">Add new quiz</h3>
            <form @submit.prevent="createQuiz()">
              <label class="w-100">Name:</label>
              <input v-model="newQuiz.name" class="w-100 mb-3" type="text" />
              <label>Description: </label>
              <textarea v-model="newQuiz.description" class="mb-2" type="text" col="5" rows="5"></textarea>
              <label class="w-100">Time:</label>
              <input v-model="newQuiz.time" class="w-100 mb-3" type="number" />
              <label class="w-100">Lesson ID:</label>
              <input v-model="newQuiz.lesson_id" class="w-100 mb-3" type="number" />
              <div class="text-end">
                <button class="btn btn-primary me-2" type="submit">Add</button>
                <button
                  class="btn btn-secondary"
                  @click="quizNewFormShow = false"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- QUIZS LIST END -->

      <!-- MODAL COURSE UPDATE-->
      <ModalComponent
        v-if="modalCourseUpdate"
        @cancel="modalCourseUpdate = false"
        @process="updateCourse()"
      />
      <!-- MODAL LESSON DELETE-->
      <ModalComponent
        v-if="modalLessonDelete"
        @cancel="modalLessonDelete = false"
        @process="deleteLesson(course_id, currentLesson.id)"
      />
      <!-- MODAL QUIZ DELETE-->
      <ModalComponent
        v-if="modalQuizDelete"
        @cancel="modalQuizDelete = false"
        @process="deleteQuiz()"
      />
  </div>
</template>
<script>
import ModalComponent from "@/components/others/ModalComponent.vue";
import { mapActions } from "vuex";
import coursesAPI from "@/api/admin/courses/index";
import lessonsAPI from "@/api/admin/lessons/index";
import quizzesAPI from "@/api/admin/quizzes/index";
import categoriesAPI from "@/api/admin/categories/index";
import course_categoriesAPI from "@/api/admin/course_categories/index";
import timeString from "@/mixin/timeString";

export default {
  data() {
    return {
      // COURSE
      // data
      course: false,
      // update form
      img: "",
      // warning modal course update
      modalCourseUpdate: false,

      // CATEGORY
      categoriesData:false,

      // LESSON
      // data
      lessonsData: false,
      currentLesson: false,
      // pagination
      currentLessonPage: 1,
      lessonCount: false,
      remainsLessonCount: false,
      // warning modal lesson delete
      modalLessonDelete: false,

      // QUIZ
      // quizzes
      quizzesData: false,
      currentQuiz: false,
      // pagination quiz
      currentQuizPage: 1,
      quizzesCount: false,
      // quiz new form
      newQuiz: {
        name: "",
        description: "",
        lesson_id: "",
        time: "",
      },
      quizNewFormShow: false,
      // warning modal quiz delete
      modalQuizDelete: false,
    };
  },
  computed: {
    course_id() {
      return this.$route.params.id;
    },
  },
  methods: {
    // STORE
    ...mapActions("alert", ["showSuccess"]),
    // COURSE
    // call api
    async getCourse() {
      this.course = await coursesAPI.showCourse(this.course_id);
      console.log(this.course);
    },
    async updateCourse() {
      let formData = new FormData();
      formData.append("name", this.course.name);
      formData.append("description", this.course.description);
      formData.append("is_publish", this.course.is_publish);
      if (this.$refs.imgInput.files[0])
        formData.append("cover_file", this.$refs.imgInput.files[0]);
      await coursesAPI.updateCourse(formData, this.course.id);
      this.showSuccess();
      this.$refs.imgInput.value = "";
    },
    // preview image before upload
    imagePreview() {
      console.log(2);
      let url = URL.createObjectURL(this.$refs.imgInput.files[0]);
      this.$refs.image.src = url;
    },
    // CATEGORIES
    async getCategories(page) {
      this.categoriesData = await categoriesAPI.getCategories(5,page);
      console.log(this.categoriesData)
    },
    // COURSE_CATEGORY
    async showCourseCategory() {
      this.course_category  = await course_categoriesAPI.showCourseCategory(this.course_id);
      console.log(this.course_category )
    },

    // LESSONS
    // call api
    async getLessons(page) {
      this.lessonsData = await lessonsAPI.getLessons(this.course_id, page);
      this.currentLessonPage = page;
      this.lessonsCount = this.lessonsData.lessons.length;
    },
    async deleteLesson(course_id, lesson_id) {
      await lessonsAPI.deleteLesson(course_id, lesson_id);
      this.showSuccess();
      if (this.lessonsCount == 1) this.getLessons(this.currentLessonPage - 1);
      else this.getLessons(this.currentLessonPage);
    },
    // clickPagin
    lessonPaging(page) {
      this.getLessons(page);
    },

    // QUIZ
    async getQuizzes(page) {
      this.quizzesData = await quizzesAPI.getQuizzes(this.course_id, page);
      console.log(this.quizzesData);
      this.currentQuizPage = page;
      this.quizzesCount = this.quizzesData.quizzes.length;
    },
    async createQuiz() {
      await quizzesAPI.createQuiz(this.course_id, this.newQuiz);
      this.showSuccess();
      this.quizNewFormShow = false
      this.getQuizzes(1);
    },
    async deleteQuiz() {
      await quizzesAPI.deleteQuiz(this.course_id, this.currentQuiz.id);
      this.showSuccess();
      if (this.quizzesCount == 1 && this.currentQuizPage !=1)
        this.getQuizzes(this.currentQuizPage - 1);
      else this.getQuizzes(this.currentQuizPage);
    },
    // clickPagin
    quizPaging(page) {
      this.getQuizzes(page);
    },
  },
  components: {
    ModalComponent,
  },
  mixins:[timeString],
  created() {
    this.getCourse();
    this.getLessons(1);
    this.getQuizzes(1);
    this.getCategories(1);
    this.showCourseCategory();
  },
  mounted() {
    // let i = 0
    // let interval = setInterval(function(){
    //   console.log(i)
    //   lessonsAPI.createLesson(20,{
    //     name:a.items[i].snippet.title,
    //     description:a.items[0].snippet.description.slice(0,150)+'...',
    //     url:'https://www.youtube.com/watch?v='+a.items[i].snippet.resourceId.videoId
    //   })
    //   if ( i==14 ) clearInterval(interval)
    //   i++
    // },5000)
    // let interval = setInterval(function(){
    //   console.log(i)
    //   lessonsAPI.deleteLesson(15,i)
    //   i++
    // },5000)
    // setTimeout(function(){
    //   clearInterval(interval)
    // },100000)
  },
};
</script>
<style lang="scss" scoped>
.cover-img {
  width: 360px;
  height: 200px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
}
.cover-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
label > span {
  display: inline-block;
  width: 150px;
}
input,
textarea {
  border-radius: 6px;
}
</style>

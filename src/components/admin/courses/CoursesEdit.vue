<template>
  <div class="mt-3" >
    <!-- COURSES INFORMATION START-->
    <CourseForm :course-id="course_id"/>
    <!-- COURSES INFROMATION END -->

    <!-- LESSONS LIST STARTS-->
    <LessonsSection :course-id="course_id"/>
     <!-- LESSONS LIST ENDS-->
      <!-- QUIZS LIST START -->
      
  </div>
</template>
<script>
import CourseForm from "@/components/admin/courses/course_edit_childs/CourseForm.vue"
import LessonsSection from "@/components/admin/courses/course_edit_childs/LessonsSection.vue"

import quizzesAPI from "@/api/admin/quizzes/index";
import timeString from "@/mixin/timeString";

export default {
  data() {
    return {
      // CATEGORY
      categoriesData:false,
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
      CourseForm,LessonsSection
  },
  mixins:[timeString],
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
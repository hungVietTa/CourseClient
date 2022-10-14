<template>
  <div class="mt-3" v-if="course">
    <h2 class="fw-bold text-center">Course#{{ course.id }}</h2>
    <!-- COURSES INFORMATION -->
    <h4 class="fw-bold text-start">Information</h4>
    <div class="mb-4">
      <form class="course-form" @submit.prevent="modalUpdateShow=true">
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
                  ><span>Date Published: </span><br /><input
                    type="text"
                    disabled
                    :value="
                      course.published_at
                        ? course.published_at.split('T')[0]
                        : 'N/A'
                    "
                /></label>
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
            <div class="d-flex mb-4">
              <label><span>Description:</span> </label>
              <textarea
                type="text"
                rows="5"
                v-model="course.description"
              ></textarea>
            </div>
          </div>
          <div class="col-1"></div>
          <div class="col-4">
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
              <label class="mb-4 btn btn-secondary p-1">
                Change cover image
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
    <!-- LESSONS IN COURSE -->
    <div class="table-wrapper pt-3 border-top">
      <h4 class="fw-bold text-start mb-4">Lessons</h4>
      <div class="text-start mb-4">
        <button class="btn btn-primary" @click="FormShow = true">
          Add new lesson
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
          <button @click="modalUpdateShow = true" class="btn btn-primary mt-4 mb-3">
          Update
        </button>
        </div>
      </div>
      <!-- ADD LESSONS FORM -->
      <div class="overlay" v-if="FormShow && load">
        <div class="form-popup">
          <h3 class="fw-bold">Add new lesson</h3>
          <form class="Course-form" @submit.prevent="add">
            <label class="w-100">Name:</label>
            <input class="w-100 mb-3" type="text" />
            <label class="w-100">Youtube URL:</label>
            <input class="w-100 mb-3" type="text" />
            <label class="w-100">Duration:</label>
            <input class="w-100 mb-3" type="text" />
            <label>Description: </label>
            <textarea class="mb-2" type="text" col="5" rows="5"></textarea>
            <div class="text-end">
              <button class="btn btn-primary me-2" type="submit">Add</button>
              <button class="btn btn-secondary" @click="FormShow = false">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- QUIZS IN COURSE -->
    <div class="table-wrapper pt-3 border-top">
      <h4 class="fw-bold text-start mb-4">QUIZS</h4>
      <div class="text-start mb-4">
        <button class="btn btn-primary" @click="quiz_FormShow = true">
          Add new quiz
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
          <button @click="modalUpdateShow = true" class="btn btn-primary mt-4 mb-3">
          Update
        </button>
        </div>
      </div>
      <!-- ADD QUIZS FORM -->
      <div class="overlay" v-if="quiz_FormShow && load">
        <div class="form-popup">
          <h3 class="fw-bold">Add new quiz</h3>
          <form  @submit.prevent="add">
            <label class="w-100">Name:</label>
            <input class="w-100 mb-3" type="text" />
            <label>Description: </label>
            <textarea class="mb-2" type="text" col="5" rows="5"></textarea>
            <div class="text-end">
              <button class="btn btn-primary me-2" type="submit">Add</button>
              <button class="btn btn-secondary" @click="quiz_FormShow = false">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
     <!-- MODAL -->
     <ModalComponent
      v-if="modalUpdateShow"
      @cancel="modalUpdateShow = false"
      @process="updateCourseHandling"
    />
     <!-- MODAL -->
     <ModalComponent
      v-if="modalRemoveShow"
      @cancel="modalRemoveShow = false"
      @process="updateCourseHandling"
    />
  </div>
</template>
<script>
import ModalComponent from "@/components/others/ModalComponent.vue";
import { mapActions,mapState } from 'vuex'

export default {
  data() {
    return {
      modalUpdateShow: false,
      modalRemoveShow: false,
      FormShow: false,
      img: "",
      quiz_FormShow: false,
      lessonsPool: [],
      currentIndex: 0,
      newLesson: {
        name: "",
        des: "",
        img: "",
        video: "",
        tag: "",
        category: "",
      },
      rawLessons: [],
      load: false,
    };
  },
  computed: {
    ...mapState("adminCourseId",{
      course:state=>state.courseData
    }),
    lessons() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.rawLessons.sort((a, b) => a.position - b.position);
    },
  },
  methods: {
    // CALL API
    ...mapActions("adminCourseId",["getCourse","updateCourse"]),
    updateCourseHandling() {
      let formData = new FormData();
      formData.append("name", this.course.name);
      formData.append("description", this.course.description);
      formData.append("is_publish", this.course.is_publish);
      if (this.$refs.imgInput.files[0])
        formData.append("cover_file", this.$refs.imgInput.files[0]);
      this.updateCourse([this.$route.params.id,formData])
      this.$refs.imgInput.value = "";
    },
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
    // OTHERS
    imagePreview() {
      console.log(2);
      let url = URL.createObjectURL(this.$refs.imgInput.files[0]);
      this.$refs.image.src = url;
    },
  },
  components: {
    ModalComponent,
  },
  created() {
    this.getCourse(this.$route.params.id);
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.lessons.push({
        id: 100 + i,
        position: i + 1,
        name: "Configure VueJS Application Tutorials  " + (i + 1),
        des: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
        img: "https://i.ytimg.com/vi/-VQhSM77_HA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLClX8lFY0T_TGnFgurbmgkujJO61w",
        tag: "framework",
        category: "frontEnd",
      });
    }
    for (let i = 0; i < 10; i++) {
      this.lessonsPool.push({
        id: 300 + i,
        name: "Configure VueJS Application Tutorials " + (i + 1),
        des: "HTML CSS TAILWIND",
        img: "https://i.ytimg.com/vi/jFfo23yIWac/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDsPN9vc9_VSLRbVrVcqZXxV4Ekig",
        tag: "framework",
        category: "frontEnd",
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.cover-img {
  width: 100%;
  overflow: hidden;
}
.cover-img img {
  width: 100%;
  object-fit: cover;
  height: 100%;
}
label > span {
  display: inline-block;
  width: 150px;
}
</style>

<template>
  <!-- <router-view></router-view> -->
  <div class="wrapper">
    <h2 class="fw-bold">Course#{{ course.id }}</h2>
    <h4 class="fw-bold text-start">Information</h4>
    <div class="form-wrapper mb-4">
      <form class="course-form" @submit.prevent="updateInfo" v-if="load">
        <label class="w-100 mb-3">
          <span>Name:</span>
          <input class="w-100" type="text" v-model="course.name"
        /></label>
       <div class="cover-img mb-3">
        <img  :src="course.cover?course.cover.file_url:''"/>
       </div>
       <div>
        <label class="mb-4" for=""> Update cover image: </label>
        <input class="border-0" ref="imgInput" type="file" />
       </div>
        <div class="d-flex mb-4">
          <div class="col-6"> 
            <label class="mb-2"><span>Publish:</span></label>
            <label class="ms-3"
              >Yes: <input type="radio" :value="1" v-model="course.is_publish"
            /></label> 
            <label class="ms-3"
              >No:
              <input
                type="radio"
                :value="0"
                v-model="course.is_publish" /></label
            ><br />
          </div>
          <label class="col-6"
            ><span>Date Published: </span
            ><input
              type="text"
              disabled
              :value="
                course.published_at ? course.published_at.split('T')[0] : 'N/A'
              "
          /></label>
        </div>
        <div class="d-flex mb-4">
          <label class="col-6"
            ><span>Date Created: </span
            ><input
              type="text"
              disabled
              :value="course.created_at.split('T')[0]"
          /></label>
          <label class="col-6"
            ><span>Date Modified: </span
            ><input
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
        <div class="text-center">
          <button type="submit" class="btn btn-primary">Update</button>
        </div>
      </form>
    </div>

    <div class="lessons-wrapper pt-3">
      <h4 class="fw-bold text-start mb-4">Lessons</h4>
      <div class="text-start mb-4">
        <button class="btn btn-primary" @click="poolShow = !poolShow">
          Add new lesson from pool
        </button>
        <button class="btn btn-primary ms-5">Add new lesson by ID</button>
        <input type="text" class="py-1 ms-2" />
      </div>
      <div v-if="true" :class="{ shorten: poolShow }">
        <table>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th colspan="3">Action</th>
          </tr>
          <tr
            @keydown.prevent="keyPos($event, index)"
            v-for="(lesson, index) in lessons"
            :key="index"
            tabindex="0"
            class="lesson"
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
            <td><button class="btn btn-danger">Remove</button></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="lessons-pool" v-if="poolShow">
      <div>
        <label class="me-1 mb-2 py-1 btn btn-secondary fw-bold">Search</label
        ><span @click="poolShow = !poolShow" class="close-pool">&times;</span
        ><input class="mb-3" type="search" />
      </div>
      <ul>
        <li v-for="(lesson, index) in lessonsPool" :key="index">
          <p class="fw-bold">{{ lesson.name }}</p>
          <p>ID: {{ lesson.id }}</p>
          <button class="btn btn-primary" @click="addFromPool(index)">
            Add
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      img: "",
      poolShow: false,
      lessonsPool: [],
      course: {},
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
    // LESSON POOL INTERACTION
    addFromPool(index) {
      this.lessonsPool[index].position =
        this.lessons[this.lessons.length - 1].position + 1;
      this.rawLessons.push(this.lessonsPool[index]);
    },
    // LESSON UNIT INTERACTION
    modifyAction(index) {
      this.courseFormShow = true;
      this.currentIndex = index;
      this.action = "Modify";
      this.newCourse = this.courses[this.currentIndex];
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
          console.log(res.data)
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
          this.$refs.imgInput.value = ''
          this.fetching();
        })
        .catch(() => {
          alert("something wrong happen !");
        });
    },
  },
  created() {
    // const getId = this.$route.params.id;
    // this.getId = this.$route.params.id;

    this.fetching();
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
  <style scoped>
.wrapper {
  padding: 20px;
  margin: auto;
  background-color: #f3f6f9;
  margin-top: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
}
.cover-img {
  width: 400px;
  height: 300px;
  margin: auto;
}
.cover-img img {
  width: 100%;
  object-fit: cover;
  height: 100%;
}
.lessons-wrapper {
  border-top: 1px solid #aaa;
}
input,
textarea {
  border-radius: 6px;
  border: 1px solid #aaa;
  padding-left: 5px;
}
table {
  margin: auto;
  width: 100%;
}
td,
th {
  vertical-align: middle;
  border: 1px solid #ddd;
  padding: 10px 5px;
}
/* table img {
  width: 80px;
}
table img:hover {
  display: block;
  position: absolute;
  width: 300px;
  height: 200px;
  top: 0;
  z-index: 2;
} */
.lesson:focus {
  outline: 2px solid #06bbcc;
  border-radius: 6px;
}
.lessons-pool {
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  width: 300px;
  background-color: white;
  padding: 15px;
  z-index: 2000;
  overflow: scroll;
}
.lessons-pool input:focus {
  outline: none;
}
.lessons-pool ul {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  list-style: none;
  padding: 0;
}
.lessons-pool ul img {
  width: 100%;
}
.lessons-pool p {
  margin: 0;
}
.course-form {
  text-align: justify;
}
textarea {
  width: 100%;
}
label > span {
  display: inline-block;
  width: 150px;
}
.close-pool {
  font-size: 26px;
  font-weight: bold;
  display: block;
  margin-left: auto;
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
}
</style>
<template>
  <div class="wrapper">
    <main>
      <div class="text-start mb-3 d-flex justify-content-between align-items-center">
        <h4 class="fw-bold">Lessons Management</h4>
        <button
          class="btn btn-primary"
          @click="
            courseFormShow = true;
            action = 'Add';
          "
        >
          Add new course
        </button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th><input type="checkbox"></th>
            <th>ID</th>
            <th>Name</th>
            <th>Publish</th>
            <th>Date Published</th>
            <th>Date Created</th>
            <th>Date Updated</th>
            <th colspan="2">Action</th>
          </tr>
        </thead>
        <tbody v-if="false">
          <tr v-for="(course, index) in courses" :key="index">
            <td><input type="checkbox"></td>
            <td>{{ course.id }}</td>
            <td>{{ course.name }}</td>
            <td>{{ course.is_publish == null ? "No" : "Yes" }}</td>
            <td>{{ course.published_at?course.published_at:"N/A" }}</td>
            <td>{{ course.created_at.split("T")[0] }}</td>
            <td>{{ course.updated_at.split("T")[0] }}</td>
            <td>
              <router-link
              target=”_blank”
                class="btn btn-primary"
                :to="$route.path + `/${course.id}`"
              >
                Edit 
              </router-link>
            </td>
            <td><button @click="deleteCourse(course.id)" class="btn btn-danger">Delete</button></td>
          </tr>
          <!-- <tr>
          <td rowspan="0">
            <ul v-for="(lesson, index) in course.lessons" :key="index">
              <li class="lesson">
                <p>{{ lesson.id }}</p>
                <p>{{ lesson.title }}</p>
                <p>{{ lesson.category }}</p>
              </li>
            </ul>
          </td>
        </tr> -->
        </tbody>
      </table>
      <div class ="overlay"  v-if="courseFormShow && load">
        <div class="form-wrapper">
        <h3 class="fw-bold">Add new course</h3>
        <form class="Course-form" @submit.prevent="add">
          <label class="w-100">Name:</label>
          <input class="w-100 mb-3 " type="text" v-model="newCourse.name" />
          <label class="mb-2">Publish:</label>
          <label class="ms-3">Yes: <input type="radio" :value="1" v-model="newCourse.is_publish" /></label>
          <label class="ms-3">No: <input type="radio" :value="0" v-model="newCourse.is_publish" /></label><br>
          <label>Description: </label>
          <textarea
          class="mb-2"
            type="text"
            col="5"
            rows="5"
            v-model="newCourse.description"
          ></textarea>
          <!-- <label>Image: <input type="text" v-model="newCourse.img" /></label> -->
          <!-- <label>Tag: <input type="text" v-model="newCourse.tag" /></label>
          <label
            >Category: <input type="text" v-model="newCourse.category"
          /></label> -->
         <div class="text-end">
          <button class="btn btn-primary me-2" type="submit">{{ action }}</button>
          <button class="btn btn-secondary" @click="courseFormShow = false">Cancel</button>
         </div>
        </form>
      </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      load: false,
      currentIndex: 0,
      newCourse: {
        name: "",
        description: ""
      },
      courseFormShow: false,
      courses: [],
      lessons: [],
    };
  },
  methods: {
    modifyAction(index) {
      this.courseFormShow = true;
      this.currentIndex = index;
      this.action = "Modify";
      this.newCourse = this.courses[this.currentIndex];
    },
    fetching() {
      // this.$store.dispatch("loadingFinishedFunc", false);
      let initialData = this.axios
        .get("/api/v1/admin/courses")
        .then((res) => {
          console.log(res.data);
          this.courses = res.data;
          // this.$store.dispatch("loadingFinishedFunc", true);
        })
        .catch((res) => {
          alert(res.response.data.error);
          this.$router.push("/");
        });
      return initialData
    },
    add() {
      this.axios
        .post("/api/v1/admin/courses", this.newCourse)
        .then(() => {
          console.log(this.newCourse)
          this.newCourse.name = ""
          this.newCourse.description = ""
          this.courseFormShow = false
          this.fetching()
        })
        .catch(() => {
          alert("something wrong happen !");
        });
    },
    modify() {},
    deleteCourse(id) {
      this.axios
        .delete(`/api/v1/admin/courses/${id}`, this.newCourse)
        .then(() => {
          this.fetching()
        })
        .catch(() => {
          alert("something wrong happen !");
        });
    }
  },
  created(){
    // this.initialData = this.fetching()
  },
  mounted() {
    this.load = true
  },
};
</script>
<style scoped>
main {
  border-radius: 9px;
  margin-top: 20px;
}
.overlay {
  background-color: rgba(3,3,3,0.2); 
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2000;
}
tr {
  border-top: 1px solid #e9e9e9;
}
td,th {
  vertical-align: middle;
  border: 1px solid #ddd;
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
  margin: auto;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  width: 600px;
  height: auto;
  top: 30%;
  border: 1px solid #aaa;
  border-radius: 12px;
  padding: 15px;
  background-color: white;
  text-align: left;
}
.lesson {
  display: flex;
}
textarea {
  width: 100%;
}
</style>



<!-- <template>
  <div class="wrapper">
    <h1>Lessons</h1>
    <div class="text-start mb-2"><button @click="lessonFormShow=true;action='Add'">Add new lesson</button></div>
    <table>
      <tr>
        <th>Index</th>
        <th>ID</th>
        <th>title</th>
        <th>Description</th>
        <th>Image</th>
        <th>Video</th>
        <th>Tag</th>
        <th>Category</th>
        <th>Duration</th>
        <th>In Courses</th>
        <th>Date Created</th>
        <th>Date Modified</th>
        <th>Modify</th>
        <th>Delete</th>
      </tr>
      <tr v-for="(lesson, index) in lessons" :key="index">
        <td>{{index}}</td>
        <td>{{ lesson.id }}</td>
        <td>{{ lesson.title }}</td>
        <td>{{ lesson.description }}</td>
        <td><img :src="lesson.img" alt="" /></td>
        <td>{{ lesson.video }}</td>
        <td>{{ lesson.tag }}</td>
        <td>{{ lesson.category }}</td>
        <td>{{ lesson.duration }}</td>
        <td><span v-for="(id,index) in lesson.courses_id" :key="index">{{id}} </span></td>
        <td>{{ lesson.date_created }}</td>
        <td>{{ lesson.date_modified }}</td>
        <td><button @click="modifyAction(index)">Modify</button></td>
        <td><button>Delete</button></td>
      </tr>
    </table>
    <div class="form-wrapper" v-if="lessonFormShow&&load">
      <h4>Lesson {{lessons[currentIndex].id}} </h4>
      <p>{{lessons[currentIndex].title}}</p>
      <form  
        class="lesson-form"
        @submit.prevent="addLesson"
      >
        <label>Title: <input type="text" v-model="newLesson.title" /></label>
        <label
          >Description: <input type="text" v-model="newLesson.des"
        /></label>
        <label>Image: <input type="text" v-model="newLesson.img" /></label>
        <label>Video: <input type="text" v-model="newLesson.video" /></label>
        <label>Tag: <input type="text" v-model="newLesson.tag" /></label>
        <label
          >Category: <input type="text" v-model="newLesson.category"
        /></label>
        <button type="submit">{{action}}</button>
        <button @click="lessonFormShow=false">Cancel</button>
      </form>
    </div>
    <nav aria-label="Page navigation example">
    <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      action:"",
      load:false,
      currentIndex:0,
      newLesson: {
        title: "",
        desription: "",
        img: "",
        video: "",
        tag: "",
        category: ""
      },
      lessonFormShow: false,
      lessons: [],
    };
  },
  methods: {
    modifyAction(index){
      this.lessonFormShow=true
      this.currentIndex=index
      this.action='Modify'
      this.newLesson = this.lessons[this.currentIndex]
    },
    add() {
      
    },
    modify(){

    },
    delete(){

    }
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.lessons.push({
        id: i + 1,
        title: "Default",
        desription: "HTML CSS TAILWIND",
        img: "https://i.ytimg.com/vi/-VQhSM77_HA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLClX8lFY0T_TGnFgurbmgkujJO61w",
        video: "aaa",
        tag: "framework",
        category: "frontEnd",
        duration:123,
        date_created:"11-02-2022",
        date_modified:"11-04-2022",
        courses_id:[223,203]
      });
    }
    this.load = true
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
  top:0;
  bottom: 0;
  border: 1px solid #333;
  padding-left: 20px;
  width: 300px;
}
</style> -->
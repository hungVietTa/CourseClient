<template>
  <div class="wrapper">
    <main>
      <div class="text-start mb-3 d-flex justify-content-between align-items-center">
        <h4 class="fw-bold">Courses Management</h4>
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
        <tbody>
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
      this.axios
        .get("/api/v1/admin/courses")
        .then((res) => {
          console.log(res);
          this.courses = res.data;
          // this.$store.dispatch("loadingFinishedFunc", true);
        })
        .catch((res) => {
          alert(res.response.data.error);
          // this.$router.push("/");
        });
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
    this.fetching()
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
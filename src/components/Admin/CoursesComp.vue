<template>
  <div class="wrapper">
    <main>
      <div class="text-start mb-2 d-flex justify-content-between">
        <h4>Courses Management</h4>
        <button
          @click="
            courseFormShow = true;
            action = 'Add';
          "
        >
          Add new course
        </button>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Ord</th>
            <th>ID</th>
            <th>Name</th>
            <th>Publish</th>
            <th>Date Published</th>
            <th>Date Created</th>
            <th>Date Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(course, index) in courses" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ course.id }}</td>
            <td>{{ course.name }}</td>
            <td>{{ course.is_publish == null ? "No" : "Yes" }}</td>
            <td>{{ course.published_at }}</td>
            <td>{{ course.created_at.split("T")[0] }}</td>
            <td>{{ course.updated_at.split("T")[0] }}</td>
            <td>
              <router-link
                class="btn btn-success"
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
      <div class="form-wrapper" v-if="courseFormShow && load">
        <p>{{ newCourse.title }}</p>
        <form class="Course-form" @submit.prevent="add">
          <label>Name: <input type="text" v-model="newCourse.name" /></label>
          <label>Description: </label>
          <textarea
            type="text"
            col="5"
            v-model="newCourse.description"
          ></textarea>
          <!-- <label>Image: <input type="text" v-model="newCourse.img" /></label> -->
          <!-- <label>Tag: <input type="text" v-model="newCourse.tag" /></label>
          <label
            >Category: <input type="text" v-model="newCourse.category"
          /></label> -->
          <button type="submit">{{ action }}</button>
          <button @click="courseFormShow = false">Cancel</button>
        </form>
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
      this.$store.dispatch("loadingFinishedFunc", false);
      let initialData = this.axios
        .get("/api/v1/admin/courses")
        .then((res) => {
          console.log(res.data);
          this.courses = res.data;
          this.$store.dispatch("loadingFinishedFunc", true);
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
          this.newCourse.name = ""
          this.newCourse.description = ""
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
    this.initialData = this.fetching()
  },
  mounted() {
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
tr {
  border-top: 1px solid #e9e9e9;
}
td {
  vertical-align: middle;
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
  border: 1px solid #333;
  padding-left: 20px;
  width: 300px;
  background-color: white;
}
.lesson {
  display: flex;
}
textarea {
  width: 100%;
}
</style>
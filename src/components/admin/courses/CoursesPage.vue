<template>
  <div class="wrapper">
    <!-- MAIN CONTENT -->
    <main class="mt-4">
      <div
        class="
          text-start
          mb-3
          d-flex
          justify-content-between
          align-items-center
        "
      >
        <h4 class="fw-bold">Courses Management</h4>
        <search-form @searching="search(value)"/>
        <div>
          <button
            class="btn btn-primary me-2"
            @click="
              courseFormShow = true;
              action = 'Add';
            "
          >
            Add new course
          </button>
          <button class="btn btn-danger">Delete</button>
        </div>
      </div>
      <div class="table-wrapper">
        <table class="table">
        <thead>
          <tr>
            <!-- <th><input type="checkbox" /></th> -->
            <th class="text-nowrap" role="button" @click="sortById">ID  <span class="ms-2"><font-awesome-icon icon="fa-solid fa-sort" /></span></th>
            <th>Name <span></span></th>
            <th>Publish <span></span></th>
            <th>Date Published <span></span></th>
            <th>Date Created <span></span></th>
            <th>Date Updated <span></span></th>
            <th colspan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(course, index) in pagiCourses[page]" :key="index">
            <!-- <td><input type="checkbox" /></td> -->
            <td>{{ course.id }}</td>
            <td>{{ course.name }} </td>
            <td>{{ course.is_publish == null ? "No" : "Yes" }} </td>
            <td>{{ course.published_at ? course.published_at.split('T')[0] : "N/A" }} </td>
            <td>{{ course.created_at.split("T")[0] }} </td>
            <td>{{ course.updated_at.split("T")[0] }} </td>
            <td>
              <router-link
                target="”_blank”"
                class="btn btn-primary"
                :to="$route.path + `/${course.id}`"
              >
                Edit
              </router-link>
            </td>
            <td>
              <button @click="modalShow=true;currentId=course.id" class="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <nav aria-label="..." class="d-inline-block">
        <ul class="pagination">
          <li v-for="(item,index) in pagiCourses" :key="index" class="page-item" :class="{active:index==page}"><a class="page-link" @click="page=index">{{index+1}}</a></li>
        </ul>
      </nav>
      <div class="overlay" v-if="courseFormShow && load">
        <div class="form-wrapper">
          <h3 class="fw-bold">Add new course</h3>
          <form class="Course-form" @submit.prevent="add">
            <label class="w-100">Name:</label>
            <input class="w-100 mb-3" type="text" v-model="newCourse.name" />
            <label>Description: </label>
            <textarea
              class="mb-2"
              type="text"
              col="5"
              rows="5"
              v-model="newCourse.description"
            ></textarea>
            <div class="text-end">
              <button class="btn btn-primary me-2" type="submit">
                {{ action }}
              </button>
              <button class="btn btn-secondary" @click="courseFormShow = false">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
    <ModalComponent v-if="modalShow" @cancel="modalShow=false" @process="deleteCourse(currentId)"/>
  </div>
</template>
<script>
import ModalComponent from "@/components/others/ModalComponent.vue"
import SearchForm from "@/components/others/SearchForm.vue"

export default {
  data() {
    return {
      modalShow:false,
      sortBy:"id",
      sortState:true,
      page: 0,
      apiCourses: [],
      load: false,
      currentIndex: 0,
      currentId:0,
      newCourse: {
        name: "",
        description: "",
      },
      courseFormShow: false,
      courses: [],
      lessons: [],
    };
  },
  computed:{
    pagiCourses(){
      let tmp = []
       for (let i = 0; i < this.courses.length; i += 5) {
            tmp.push(this.courses.slice(i, i + 5));
          }
      return tmp
    },
    // sortedCourses(){
    //   return this.courses.sort(function(a, b) {
    //     if ( this.sortBy.includes('date') )
    //       return a[this]
    //  });
    // }

  },
  methods: {
    fetching() {
      // this.$store.dispatch("loadingFinishedFunc", false);
      this.axios
        .get("/api/v1/admin/courses")
        .then((res) => {
          console.log(res.data)
            this.courses = res.data
        })
        .catch((res) => {
          alert(res.response.data.error);
          // this.$router.push("/");
        });
    },
    search(value){
      console.log(value)
    },
    sortById(){

    },
    add() {
      this.axios
        .post("/api/v1/admin/courses", this.newCourse)
        .then(() => {
          console.log(this.newCourse);
          this.newCourse.name = "";
          this.newCourse.description = "";
          this.courseFormShow = false;
          this.fetching()
        })
        .catch(() => {
          alert("something wrong happen !");
        });
    },
    deleteCourse(id) {
    console.log(id)
    if (id)
      this.axios
        .delete(`/api/v1/admin/courses/${id}`, this.newCourse)
        .then(() => {
          this.fetching();
        })
        .catch(() => {
          alert("something wrong happen !");
        });
    },
  },
  components:{
    ModalComponent,SearchForm
  },
  created() {
    this.fetching();
  },
  mounted() {
    this.load = true
    // let el=this
    // this.load = true
    // this.axios.get('http://localhost:4000/apiCourses').then(res=>{
    //   let apiCourses=res.data[0].items
    //   let i = 9
    //   let interval = setInterval(function(){
    //     el.axios.post('/api/v1/admin/courses',{
    //         "name":apiCourses[i].snippet.title,
    //         "description":apiCourses[i].snippet.description
    //     }).then(()=>{i++;console.log(2)}).catch(res=>console.log(res))
    //   },2000)
    //   setTimeout(()=>{
    //     clearInterval(interval)
    //   },22000)
    // }).catch(res=>console.log(res))
  },
};
</script>
<style scoped>
main {
  border-radius: 9px;
}
.overlay {
  background-color: rgba(3, 3, 3, 0.2);
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
td,
th {
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
.page-link {
  cursor: pointer;
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
<template>
  <div>
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
              newFormShow = true;
              action = 'Add';
            "
          >
            Add new course
          </button>
          <button class="btn btn-danger">Delete</button>
        </div>
      </div>
      <!-- TABLE -->
      <div class="table-wrapper">
        <table class="table">
        <thead>
          <tr>
            <!-- <th><input type="checkbox" /></th> -->
            <th class="text-nowrap" role="button" >ID  <span class="ms-2"><font-awesome-icon icon="fa-solid fa-sort" /></span></th>
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
      <div class="text-center">
        <nav aria-label="..." class="d-inline-block">
        <ul class="pagination">
          <li  v-for="(item,index) in pagiCourses" :key="index" class="page-item" :class="{active:index==page}"><a class="page-link" @click="page=index">{{index+1}}</a></li>
        </ul>
      </nav>
      </div>
      <!-- OVERLAY START-->
      <div class="overlay" v-if="newFormShow && load">
        <!-- NEW COURSES FORM START-->
        <div class="form-popup">
          <h3 class="fw-bold">Add new course</h3>
          <form class="Course-form" @submit.prevent="createCourseHandlding(newCourse)">
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
              <button class="btn btn-secondary" @click="newFormShow = false">
                Cancel
              </button>
            </div>
          </form>
        </div>
         <!-- NEW COURSES FORM END-->
      </div>
      <!-- OVERLAY END-->
    </main>
    <!-- MODAL -->
    <ModalComponent v-if="modalShow" @cancel="modalShow=false" @process="deleteCourse(currentId)"/>
    <!-- MODAL -->
  </div>
</template>
<script>
import ModalComponent from "@/components/others/ModalComponent.vue"
import SearchForm from "@/components/others/SearchForm.vue"
import { mapActions,mapState } from 'vuex'

export default {
  data() {
    return {
      // modal
      modalShow:false,
      // pagination
      sortBy:"id",
      sortState:true,
      page: 0,
      // courses list
      currentIndex: 0,
      currentId:0,
      // new course
      newCourse: {
        name: "",
        description: "",
      },
      //new form
      newFormShow: false,
    };
  },
  computed:{
    ...mapState("adminCourses",{
      courses:state=>state.coursesData
    }),
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
    ...mapActions("adminCourses",["createCourse","getCourses","deleteCourse"]),
    createCourseHandlding(newCourse){
      this.createCourse(newCourse)
      newCourse.name = ""
      newCourse.description = ""
      this.newFormShow = false
    },
    search(value){
      console.log(value)
    }
  },
  components:{
    ModalComponent,SearchForm
  },
  created() {
    this.getCourses()
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
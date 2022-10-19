<template>
  <div v-if="data" ref="container">
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
      <!-- COURSES LIST START -->
      <div class="table-wrapper">
        <table class="table">
        <thead>
          <tr>
            <!-- <th><input type="checkbox" /></th> -->
            <th class="text-nowrap" role="button" >ID  <span class="ms-2"><font-awesome-icon icon="fa-solid fa-sort" /></span></th>
            <th>Name <span></span></th>
            <th>Date Created <span></span></th>
            <th>Date Updated <span></span></th>
            <th colspan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(course, index) in data.courses" :key="index">
            <!-- <td><input type="checkbox" /></td> -->
            <td>{{ course.id }}</td>
            <td>{{ course.name }} </td>
            <td>{{ course.created_at.split("T")[0] }} </td>
            <td>{{ course.updated_at.split("T")[0] }} </td>
            <td>
              <router-link
                class="btn btn-primary"
                :to="$route.path + `/${course.id}`"
              >
                Edit
              </router-link>
            </td>
            <td>
              <button @click="modalShow=true;currentCourse=course" class="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <!-- COURSES LIST END -->

       <!-- PAGINATION START -->
       <div class="vue-pagination mb-4" v-if="data.meta.pages>1">
        <paginate v-model="currentPage" :pageCount="data.meta.pages" :click-handler="coursesPaging"/>
      </div>
      <!-- PAGINATION END -->

      <!-- OVERLAY START-->
      <div class="overlay" v-if="newFormShow">
        <!-- NEW COURSES FORM START-->
        <div class="form-popup">
          <h3 class="fw-bold">Add new course</h3>
          <form class="Course-form" @submit.prevent="createCourse(newCourse)">
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
                Add
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
    <ModalComponent v-if="modalShow" @cancel="modalShow=false" @process="deleteCourse(currentCourse.id)"/>
    <!-- MODAL -->
  </div>
</template>
<script>
import ModalComponent from "@/components/others/ModalComponent.vue"
import SearchForm from "@/components/others/SearchForm.vue"
import { mapActions } from 'vuex'
import API from "@/api/admin/courses/index";
import formHandling from "@/mixin/formHandling";

export default {
  data() {
    return {
      // data
      data:false,
      // pagination
      currentPage:1,
      // courses list
      coursesCount:0,
      currentCourse:false,
      // new course
      newCourse: {
        name: "",
        description: "",
      },
      //new form
      newFormShow: false,
       // warning modal
       modalShow:false,
    };
  },
  methods: {
    // STORE
    ...mapActions("alert",["showSuccess"]),
    // CALL API
    async getCourses(page) {
      this.data = await API.getCourses(page);
      console.log(this.data)
      this.currentPage = page
      this.coursesCount = this.data.courses.length
    },
    async createCourse(newCourse) {
      await API.createCourse(newCourse);
      this.showSuccess()
      this.getCourses(1)
      this.newFormShow = false
      this.clearForm(this.newCourse);
    },
    async deleteCourse(id){
      await API.deleteCourse(id)
      this.showSuccess()
      if( this.coursesCount == 1 )
        this.getCourses(this.currentPage-1)
      else
        this.getCourses(this.currentPage)
    },
    // PAGINATION
    coursesPaging(page){
      this.getCourses(page)
    }
  },
  mixins: [formHandling],
  components:{
    ModalComponent,SearchForm
  },
  created() {
    this.getCourses(1)
  }
};
</script>
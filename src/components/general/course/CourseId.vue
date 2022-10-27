<template>
  <div class="pt-4" v-if="course">
    <div class="m-auto px-3 home-course-id">
      <div class="row">
        <div class="col-5">
          <div>
            <img
              class="w-100 border-radius-6"
              :src="course.cover.file_url"
              alt=""
            />
          </div>
        </div>
        <div class="col-7">
          <div class="d-flex flex-column justify-content-between h-100">
            <h3 class="fw-bold">{{course.name}}</h3>
            <h5 class="mb-5">{{course.description}}</h5>
            <div class="mb-2">
              <span>4.5</span>
              <RatingStars class="ms-2" :score="5" />
              <span class="ms-2">(1,149 ratings)</span><br>
              <span>9,069 students</span>
            </div>
            <div class="mb-2">
              <span>Last updated 8/2019</span>
            </div>
            <div class="text-center">
              <router-link v-if="!course.is_subscribed" :to="$route.path+'/learning'" class="btn w-100 btn-primary   text-white">Try it now</router-link>
              <button v-if="course.is_subscribed" class="btn w-100 btn-primary   text-white">Continue</button>
            </div>  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import coursesAPI from "@/api/users/courses/index";
import RatingStars from "@/components/others/RatingStars.vue";

export default {
  data() {
    return {
      course: false,
    };
  },
  computed:{
    course_id(){
      return this.$route.params.id
    }
  },
  methods: {
    async getCourse() {
      this.course = await coursesAPI.showCourse(this.course_id);
      console.log(this.course);
    },
  },
  components:{
    RatingStars
  },
  created(){
    this.getCourse();
  },
};
</script>
<style>
.home-course-id {
  width: 1200px;
}
</style>
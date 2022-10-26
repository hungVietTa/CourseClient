<template>
  <div v-if="categoriesData">
    <!-- CATEGORIES START -->
    <CategoriesBar :categories="categoriesData.categories" @selectCategory="selectCategory"/>
    <!-- CATEGORIES END -->

    <!-- COURES POOL -->
    <div class="courses-pool px-3 w-1300 m-auto">
      <!-- SMALL NAVBAR -->
      <SmallNavbar :selectCriteria="selectCriteria"/>
      <!-- SMALL NAVBAR -->

      <!-- PROMINENT SECTION -->
      <ProminentSection
        :courses-pages="coursesPages"
        @getMoreSlide="searchCourses"
      />
      <!-- PROMINENT SECTIO -->

      <!-- POOL SECTION start-->
      <PoolSection :courses-pages="coursesPages" />
      <!-- POOL SECTION end-->
    </div>
  </div>
</template>
<script>
import CategoriesBar from "@/components/general/courses/childs/CategoriesBar.vue";
import SmallNavbar from "@/components/general/courses/childs/SmallNavbar.vue";
import ProminentSection from "@/components/general/courses/childs/ProminentSection.vue";
import PoolSection from "@/components/general/courses/childs/PoolSection.vue";

import categoriesAPI from "@/api/admin/categories/index";
import coursesAPI from "@/api/admin/courses/index";
import stringCase from "@/mixin/stringCase";

export default {
  data() {
    return {
      // CaTEGORIES
      categoriesData: false,
      currentCategory:false,
      currentCriteria:false,
      // PROMINENT COURSES
      coursesPages: [],
      page: 1,
      total: 2,
      // ALL COURSE
      sortCriteria: "Most Popular",
      sortByShow: false,
    };
  },
  computed:{
    searchObject(){
      return {
        category_id:this.currentCategory.id,
        criteria:this.currentCriteria
      }
    }
  },
  methods: {
    async getCategories() {
      this.categoriesData = await categoriesAPI.getCategories(1);
      this.currentCategory=this.categoriesData.categories[0]
      if ( this.$route.path == '/courses')
        this.$router.push('/courses/'+this.toUrl(this.currentCategory.name))
      this.searchCourses();
    },
    // GET PROMINENT COURSE
    async searchCourses() {
      if (this.page > this.total) return;
      let tmp = await coursesAPI.searchCourses(4, this.page++,this.searchObject);
      this.total = tmp.meta.pages;
      this.coursesPages.push(tmp.courses);
    },
    selectCategory(category){
      this.coursesPages = []
      this.page = 1
      this.currentCategory = category
      this.$router.push('/courses/'+this.toUrl(category.name))
      this.searchCourses()
    },
    selectCriteria(criteria){
      this.coursesPages = []
      this.page = 1
      this.currentCriteria = criteria
      this.searchCourses()
    }
  },
  components: {
    CategoriesBar,
    SmallNavbar,
    ProminentSection,
    PoolSection
  },
  mixins: [stringCase],
  created(){
    this.getCategories();
  }
};
</script>
<style lang="scss">
@import "@/assets/styles/general/course_item.scss";
ul {
  box-shadow: 0 1px 1px rgb(0 0 0 / 15%);
}
.router-link-active {
  font-weight: bold;
  font-size: 18px;
}
/* CAROUSEL */

// COURESES ITEM

// ALL COURSES

.all-courses .course-item:hover img {
  transform: scale(1);
}
// SELECT BOX
select {
  padding: 10px;
  border-radius: 9px;
  border: 0;
  outline: 0;
  background-color: transparent;
}
select {
  /* for Firefox */
  -moz-appearance: none;
  /* for Chrome */
  -webkit-appearance: none;
}

/* For IE10 */
select::-ms-expand {
  display: none;
}
// SELECT
.select-arrow {
  position: absolute;
  display: block;
  top: 50%;
  transform: translateY(-50%);
  right: 30px;
  z-index: -1;
}
</style>

<template>
  <div v-if="categoriesData">
    <!-- CATEGORIES START -->
    <CatergoriesBar :categories="categoriesData.categories"/>
     <!-- CATEGORIES END -->

    <!-- COURES POOL -->
    <div v-if="false" class="courses-pool px-3 w-1300 m-auto ">
      <!-- heading start-->
      <div>
        <h3 class="fw-bold mb-5">{{ categories[0] }}</h3>
        <h5 class="fw-bold mb-3">Courses to get you started</h5>
      </div>
      <!-- heading end -->

      <!-- Trending popular new ... start -->
      <div class="mb-4">
        <!-- nav-bar start-->
        <ul class="d-flex secondary-style-nav p-0">
          <li
            @click="navButton = 'Most popular'"
            :class="{ active: navButton == 'Most popular' }"
            class="me-4 py-2 text-secondary text-center"
          >
            <h6 class="fw-bold mb-0">Most popular</h6>
          </li>
          <li
            @click="navButton = 'New'"
            :class="{ active: navButton == 'New' }"
            class="me-4 py-2 text-secondary text-center"
          >
            <h6 class="fw-bold mb-0">New</h6>
          </li>
          <li
            @click="navButton = 'Trending'"
            :class="{ active: navButton == 'Trending' }"
            class="py-2 text-secondary text-center"
          >
            <h6 class="fw-bold mb-0">Trending</h6>
          </li>
        </ul>
        <!-- nav-bar end -->
        <!-- carousel start-->
        <div class="courses-carousel">
          <carousel
            ref="carousel"
            :per-page="1"
            :navigationEnabled="true"
            :navigateTo="navigateTo"
            @navigation-click="play"
            :navigation-next-label="nextLabel"
            :navigation-prev-label="prevLabel"
            :paginationEnabled="false"
          >
            <!-- courses slide start-->
            <slide v-for="(page, index) in coursesSlides" :key="index">
              <div class="container-xxl">
                <div class="row g-4 justify-content-center">
                  <div
                    v-for="(course, index) in page"
                    :key="index"
                    class="col-lg-3 col-md-6 wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    <router-link class="d-block" :to="`/courses/${course.id}/learning`">
                      <div class="course-item bg-light">
                      <div class="position-relative overflow-hidden">
                        <img
                          class="img-fluid"
                          :src="course.cover.file_url"
                          alt=""
                        />
                      </div>
                      <div class="text-center p-2 pb-0">
                        <div class="mb-2">
                          <small
                            ><font-awesome-icon icon="fa-solid fa-star"
                          /></small>
                          <small
                            ><font-awesome-icon icon="fa-solid fa-star"
                          /></small>
                          <small
                            ><font-awesome-icon icon="fa-solid fa-star"
                          /></small>
                          <small
                            ><font-awesome-icon icon="fa-solid fa-star"
                          /></small>
                          <small
                            ><font-awesome-icon icon="fa-solid fa-star"
                          /></small>
                          <br />
                          <small>(1.064)</small>
                          <p>{{course.is_subscribe}}</p>
                        </div>
                        <div class="course-title">
                          <h6 class="mb-2 fw-bold text-primary">
                            {{ course.name }}
                          </h6>
                        </div>
                      </div>
                      <div class="d-flex border-top">
                        <small class="flex-fill text-center border-end py-2"
                          ><font-awesome-icon
                            icon="fa-solid fa-user-tie"
                          />&nbsp; {{ course.description }}</small
                        >
                        <small class="flex-fill text-center border-end py-2"
                          ><font-awesome-icon icon="fa-solid fa-clock" />&nbsp;
                          1.49 Hrs</small
                        >
                        <small class="flex-fill text-center py-2"
                          ><font-awesome-icon icon="fa-solid fa-user" />&nbsp;
                          Students</small
                        >
                      </div>
                    </div>
                    </router-link>
                    <button v-if="!course.is_subscribe" @click.stop="subscribe(course.id)" class="btn btn-primary">Subscribe</button>
                  </div>
                </div>
              </div>
            </slide>
            <!-- courses slide end-->
          </carousel>
        </div>
        <!-- carousel end-->
      </div>
      <!-- Trending popular new ... end -->

      <!-- All courses start-->
      <div class="container-xxl all-courses border-top-secondary-blur pt-4">
        <h3 class="mb-4 fw-bold">All Development courses</h3>
        <div>
          <div class="row mb-3 g-4 align-items-center">
            <div class="col-3">
              <div class="row g-1">
                <div class="col-4">
                  <div
                    class="
                      border border-secondary
                      h-100
                      d-flex
                      align-items-center
                      justify-content-center
                    "
                  >
                    <i class="me-2"
                      ><font-awesome-icon icon="fa-solid fa-bars"
                    /></i>
                    <span>Filter</span>
                  </div>
                </div>
                <div class="col-8">
                  <div class="border border-secondary w-100 position-relative">
                    <select
                      required=""
                      aria-invalid="false"
                      name="sort"
                      form="filter-form"
                      id="u240-form-group--47"
                      class="w-100 h-100 ps-4 bg-transparent"
                    >
                      <option value="highest-rated">Highest Rated</option>
                      <option value="popularity">Most Popular</option>
                      <option value="newest">Newest</option>
                    </select>
                    <div class="select-arrow">
                      <font-awesome-icon icon="fa-solid fa-caret-down" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-9">
              <h5 class="m-0 text-end">999 results</h5>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <!-- rating start-->
              <section class="mb-3 border-top-secondary-blur">
                <div
                  @click="ratingOptions = !ratingOptions"
                  class="
                    d-flex
                    align-items-center
                    justify-content-between
                    px-3
                    py-2
                    mb-3
                    cursor-pointer
                  "
                >
                  <h4 class="m-0">Ratings</h4>
                  <span
                    ><font-awesome-icon icon="fa-solid fa-caret-down"
                  /></span>
                </div>
                <div v-show="ratingOptions">
                  <div v-for="i in 5" :key="i">
                    <label class="container-radio">
                      <input type="radio" name="rate" class="me-2" />
                      <small
                        v-for="j in 5"
                        :key="j"
                        class="star-icon text-white"
                      >
                        <font-awesome-icon
                          :class="{ 'text-star': 7 - i > j }"
                          icon="fa-solid fa-star"
                      /></small>
                      <span class="ms-2 text-secondary"
                        >{{ 6 - i }} stars {{ i == 1 ? "" : "& up" }}</span
                      >
                      <span class="checkmark-radio"></span>
                    </label>
                  </div>
                </div>
              </section>
              <!-- rating end -->

              <!-- duration start -->
              <section class="border-top-secondary-blur">
                <div
                  @click="durationOptions = !durationOptions"
                  class="
                    d-flex
                    align-items-center
                    justify-content-between
                    px-3
                    py-2
                    mb-3
                    cursor-pointer
                  "
                >
                  <h4 class="m-0">Duration</h4>
                  <span
                    ><font-awesome-icon icon="fa-solid fa-caret-down"
                  /></span>
                </div>
                <div v-show="durationOptions">
                  <div v-for="(item, index) in durations" :key="index">
                    <label class="container-checkbox text-secondary">
                      <input type="checkbox" name="duration" class="me-2" />
                      <span>{{ item }} Hour{{ index == 0 ? "" : "s" }}</span>
                      <span class="checkmark-checkbox"></span>
                    </label>
                  </div>
                </div>
              </section>
              <!-- duration end -->
            </div>

            <div class="col-9">
              <div class="container-xxl">
                <div
                  v-for="(course, index) in coursesSlides[0]"
                  :key="index"
                  class="row g-4 justify-content-center"
                >
                  <div
                    class="col-12 wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    <router-link class="d-block text-666" :to="`/courses/${course.id}/learning`">
                      <div class="course-item bg-light row cursor-pointer mb-3">
                      <div class="position-relative overflow-hidden col-4">
                        <img
                          class="img-fluid"
                          :src="course.cover.file_url"
                          alt=""
                        />
                      </div>
                      <div class="text-center p-2 pb-0 col-8">
                        <div class="course-title text-start">
                          <div>
                            <h5 class="mb-2 fw-bold">
                            {{ course.name }}
                          </h5>
                          </div>
                          <div class="text-start">
                            <p class="flex-fill p-0 m-1"
                            ><font-awesome-icon
                              icon="fa-solid fa-user-tie"
                            />&nbsp; {{ course.description }}</p
                          >
                          <p class="flex-fill p-0 m-1"
                            ><font-awesome-icon
                              icon="fa-solid fa-clock"
                            />&nbsp; 1.49 Hrs</p
                          >
                          <p class="flex-fill p-0 m-1"
                            ><font-awesome-icon icon="fa-solid fa-user" />&nbsp;
                            Students</p
                          >
                          </div>
                        </div>
                        <div class="mb-2 text-start">
                          <small
                            ><font-awesome-icon icon="fa-solid fa-star"
                          /></small>
                          <small
                            ><font-awesome-icon icon="fa-solid fa-star"
                          /></small>
                          <small
                            ><font-awesome-icon icon="fa-solid fa-star"
                          /></small>
                          <small
                            ><font-awesome-icon icon="fa-solid fa-star"
                          /></small>
                          <small
                            ><font-awesome-icon icon="fa-solid fa-star"
                          /></small>
                          <small class="ms-2">(123)</small>
                        </div>
                      </div>
                    </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- All courses end-->
    </div>
  </div>
</template>
<script>
import CatergoriesBar from "@/components/general/courses/childs/CategoriesBar.vue"
import categoriesAPI from "@/api/admin/categories/index"
import coursesAPI from "@/api/admin/courses/index";

export default {
  data() {
    return {
      // CaTEGORIES
      categoriesData:false,
      // COURSES - POPULAR-TRENDING-NEW
      // nav button
      navButton: 'Most popular',
      // data
      coursesSlides: [],
      slides: 2,
      totalPage:false,
      // carousel
      prevLabel: `<svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="currentColor" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
						</svg>`,
      nextLabel: `<svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="currentColor" d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
						</svg>`,
      count: 1,
      navigateTo: 0,
      // ALL COURSE
      sortCriteria: "Most Popular",
      sortByShow: false,
      // sort criteria
      durations: ["0-1", "1-3", "3-6", "6+"],
      ratingOptions: false,
      durationOptions: false,
    };
  },
  methods: {
    async getCategories(){
      this.categoriesData =await categoriesAPI.getCategories(1)
      console.log(this.categoriesData)
    },
    // GET COURSES POPULAR TRENDING NEW
    async getCourses() {
      this.categories =await categoriesAPI.getCategories(1)
      this.coursesSlides.push(await coursesAPI.getCourses(4,1).then(res=>{
        this.totalPage = res.meta.pages
        return res.courses
      }));
      this.coursesSlides.push(await coursesAPI.getCourses(4,2).then(res=>res.courses));
    },
    // carousel
    async play(direction) {
      let el = this;
      if (this.coursesSlides.length==this.totalPage)
        return
      console.log(this.coursesSlides.length);
      if (
        direction == "forward" &&
        this.$refs.carousel.currentPage == this.coursesSlides.length - 1 &&
        this.slides != 4
      ) {
        this.coursesSlides.push(await coursesAPI.getCoursesList(++this.slides));
      }
      console.log(this.data.pages.length);
    },
    // Subscribe
    subscribe(id){
      this.axios.post(`api/v1/users/courses/${id}/subscribes`).then(res=>console.log(res.data))
    }
  },
  components:{
    CatergoriesBar
  },
  created(){
    this.getCategories();
  },
  mounted() {
    console.log(this.$refs.carousel);
  },
}
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
.courses-carousel {
  .VueCarousel-inner {
  height: auto;
}
.VueCarousel-pagination {
  position: absolute;
  bottom: 20px;
}
.VueCarousel-navigation-button {
  border: 1px solid white !important;
  background-color: #06bbcc !important;
  border-radius: 50%;
}
.VueCarousel-navigation-prev {
  margin-right: 0 !important;
  display: block !important;
  left: -14px !important;
  transform: translateY(-200%) translateX(0%) !important;
}
.VueCarousel-navigation-next {
  right: -14px !important;
  transform: translateY(-200%) translateX(0%) !important;
  display: block !important;
}
.VueCarousel-navigation-button svg {
  width: 26px !important;
  height: 26px !important;
  color: white;
}
.VueCarousel-dot {
  background-color: #aaa !important;
}
.VueCarousel-dot--active {
  background-color: #06bbcc !important;
}
.VueCarousel-dot:focus {
  border: none !important;
  outline: none !important;
}
}
// COURESES ITEM
.course-carousel .course-title {
  min-height:50px;
}
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
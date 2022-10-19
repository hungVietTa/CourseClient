<template>
  <div>
    <!-- CATEGORIES START -->
    <nav class="categories-bar">
      <ul class="d-flex align-items-center px-5 bg-primary border-primary-blur">
        <li
          class="px-4 py-1"
          v-for="(category, index) in categories"
          :key="index"
        >
          <router-link class="text-white" to="/" :key="category">
            {{ category }}
          </router-link>
        </li>
      </ul>
    </nav>
    <!-- CATEGORIES END -->

    <!-- COURES POOL -->
    <div class="courses-pool w-1300 m-auto">
      <!-- heading start-->
      <div>
        <h1>{{ data.category }}</h1>
        <h3>Courses to get you started</h3>
      </div>
      <!-- heading end -->

      <!-- Trending popular new ... start -->
      <div>
        <!-- nav-bar start-->
        <ul class="d-flex secondary-style-nav p-0">
          <li
            @click="navButton = 'Most popular'"
            :class="{ active: navButton == 'Most popular' }"
            class="px-3 py-2 text-secondary text-center active"
          >
            <h6 class="fw-bold mb-0">Most popular</h6>
          </li>
          <li
            @click="navButton = 'New'"
            :class="{ active: navButton == 'New' }"
            class="px-3 py-2 text-secondary text-center"
          >
            <h6 class="fw-bold mb-0">New</h6>
          </li>
          <li
            @click="navButton = 'Trending'"
            :class="{ active: navButton == 'Trending' }"
            class="px-3 py-2 text-secondary text-center"
          >
            <h6 class="fw-bold mb-0">Trending</h6>
          </li>
        </ul>
        <!-- nav-bar end -->
        <!-- carousel start-->
        <div>
          <carousel
            class="home-carousel"
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
            <slide v-for="(page, index) in data.pages" :key="index">
              <div class="container-xxl">
                <div class="row g-4 justify-content-center">
                  <div
                    v-for="(course, index) in page"
                    :key="index"
                    class="col-lg-3 col-md-6 wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    <div class="course-item bg-light">
                      <div class="position-relative overflow-hidden">
                        <img
                          class="img-fluid"
                          :src="course.cover_file"
                          alt=""
                        />
                        <div
                          class="
                            w-100
                            d-flex
                            justify-content-center
                            position-absolute
                            bottom-0
                            start-0
                            mb-4
                          "
                        >
                          <a
                            href="#"
                            class="
                              flex-shrink-0
                              btn btn-sm btn-primary
                              px-3
                              border-end
                            "
                            style="border-radius: 30px 0 0 30px"
                            >Read More</a
                          >
                          <a
                            href="#"
                            class="flex-shrink-0 btn btn-sm btn-primary px-3"
                            style="border-radius: 0 30px 30px 0"
                            >Join Now</a
                          >
                        </div>
                      </div>
                      <div class="text-center p-4 pb-0">
                        <div class="mb-3">
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
                          <small
                            ><font-awesome-icon icon="fa-solid fa-star"
                          /></small>
                          <br />
                          <small>(123)</small>
                        </div>
                        <div class="course-title">
                          <h5 class="mb-4">
                            {{ course.name }}
                          </h5>
                        </div>
                      </div>
                      <div class="d-flex border-top">
                        <small class="flex-fill text-center border-end py-2"
                          ><font-awesome-icon
                            icon="fa-solid fa-user-tie"
                          />&nbsp; John Doe</small
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
    </div>
  </div>
</template>
<script>
import API from "@/api/general/courses/index";

export default {
  data() {
    return {
      // CATEGORY
      // data
      categories: false,

      // COURSES - POPULAR-TRENDING-NEW
      // data
      data: false,

      // CAROUSEL
      prevLabel: `<svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="currentColor" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
						</svg>`,
      nextLabel: `<svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="currentColor" d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
						</svg>`,
      count: 1,
      navigateTo: 0,
      // SECONDARY NAV
      navButton: false,
    };
  },
  methods: {
    // CATEGORY
    async getCategories() {
      this.categories = await API.getCategories();
      // NAVIGATE TO FIRST CATEGORY IF FIRST TIME
      if (this.$route.path == "/courses")
        this.$router.push(
          `courses/${this.categories[0].split(" ").join("-").toLowerCase()}`
        );
      await this.getCoursesList();
    },
    // GET COURSES POPULAR TRENDING NEW
    async getCoursesList() {
      this.data = await API.getCoursesList();
    },
    // carousel
    async play(direction) {
      let el = this;
      console.log(this.data.pages.length);
      if (
        direction == "forward" &&
        this.$refs.carousel.currentPage == this.data.pages.length - 1
      ) {
        this.data.pages.push(await API.getCoursesList2());
      }
      console.log(this.data.pages.length);
    },
  },
  created() {
    this.getCategories();
  },
  mounted() {
    console.log(this.$refs.carousel);
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/general/course_item.scss";
ul {
  box-shadow: 0 1px 1px rgb(0 0 0 / 15%);
}
a img {
  height: 30px;
  width: 30px;
}
.router-link-active {
  font-weight: bold;
}
/* CAROUSEL */
.VueCarousel-inner {
  height: auto;
}
.VueCarousel-pagination {
  position: absolute;
  bottom: 20px;
}
.VueCarousel-navigation-button {
  border: 1px solid white !important;
}
.VueCarousel-navigation-prev {
  margin-right: 0 !important;
  display: inline !important;
  left: unset !important;
  right: 40px !important;
  transform: translateY(-110%) translateX(0%) !important;
}
.VueCarousel-navigation-next {
  right: 40px !important;
  transform: translateY(10%) translateX(0%) !important;
  display: block !important;
}
.VueCarousel-navigation-button svg {
  width: 30px !important;
  height: 30px !important;
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
</style>
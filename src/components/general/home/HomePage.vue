<template>
  <main>
    <!-- CAROUSEL -->
    <carousel
      v-if="billboards"
      class="home-carousel"
      ref="carousel"
      :per-page="1"
      :navigationEnabled="true"
      :navigation-next-label="nextLabel"
      :navigation-prev-label="prevLabel"
      :loop="true"
      :mouse-drag="false"
    >
      <slide v-for="(billboard, index) in billboards" :key="index">
        <div class="owl-carousel-item position-relative">
          <img class="img-fluid w-100" :src="billboard.img" alt="" />
          <div
            class="
              position-absolute
              top-0
              start-0
              w-100
              h-100
              d-flex
              align-items-center
            "
            style="background: rgba(24, 29, 56, 0.7)"
          >
            <div class="container slide-caption">
              <div class="row justify-content-start">
                <div class="col-sm-10 col-lg-8 text-start">
                  <h5
                    class="
                      text-primary text-uppercase
                      mb-3
                      animated
                      slideInDown
                    "
                  >
                    {{ billboard.name }}
                  </h5>
                  <h1 class="display-3 text-white animated slideInDown">
                    {{ billboard.title }}
                  </h1>
                  <p class="fs-5 text-white mb-4 pb-2">
                    {{ billboard.description }}
                  </p>
                  <router-link
                    to="/about"
                    class="
                      btn btn-primary
                      py-md-3
                      px-md-5
                      me-3
                      animated
                      slideInLeft
                    "
                    >Read More</router-link
                  >
                  <router-link
                    to="/register"
                    class="btn btn-light py-md-3 px-md-5 animated slideInRight"
                    >Join Now</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </slide>
    </carousel>
    <!-- Categories Start -->
    <div class="container-xxl py-5 category">
      <div class="container">
        <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 class="section-title bg-white text-center text-primary px-3">
            Categories
          </h6>
          <h1 class="mb-5">Courses Categories</h1>
        </div>
        <div class="row g-3">
          <div class="col-lg-7 col-md-6">
            <div class="row g-3">
              <div class="col-lg-12 col-md-12 wow zoomIn" data-wow-delay="0.1s">
                <a class="position-relative d-block overflow-hidden" href="">
                  <img
                    class="img-fluid"
                    src="@/assets/img/category/cat-1.jpg"
                    alt=""
                  />
                  <div
                    class="
                      bg-white
                      text-center
                      position-absolute
                      bottom-0
                      end-0
                      py-2
                      px-3
                    "
                    style="margin: 1px"
                  >
                    <h5 class="m-0">Web Design</h5>
                    <small class="text-primary">49 Courses</small>
                  </div>
                </a>
              </div>
              <div class="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.3s">
                <a class="position-relative d-block overflow-hidden" href="">
                  <img
                    class="img-fluid"
                    src="@/assets/img/category/cat-2.jpg"
                    alt=""
                  />
                  <div
                    class="
                      bg-white
                      text-center
                      position-absolute
                      bottom-0
                      end-0
                      py-2
                      px-3
                    "
                    style="margin: 1px"
                  >
                    <h5 class="m-0">Graphic Design</h5>
                    <small class="text-primary">49 Courses</small>
                  </div>
                </a>
              </div>
              <div class="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.5s">
                <a class="position-relative d-block overflow-hidden" href="">
                  <img
                    class="img-fluid"
                    src="@/assets/img/category/cat-3.jpg"
                    alt=""
                  />
                  <div
                    class="
                      bg-white
                      text-center
                      position-absolute
                      bottom-0
                      end-0
                      py-2
                      px-3
                    "
                    style="margin: 1px"
                  >
                    <h5 class="m-0">Video Editing</h5>
                    <small class="text-primary">49 Courses</small>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div
            class="col-lg-5 col-md-6 wow zoomIn"
            data-wow-delay="0.7s"
            style="min-height: 350px"
          >
            <a class="position-relative d-block h-100 overflow-hidden" href="">
              <img
                class="img-fluid start-0 position-absolute w-100 h-100"
                src="@/assets/img/category/cat-4.jpg"
                alt=""
                style="object-fit: cover"
              />
              <div
                class="
                  bg-white
                  text-center
                  position-absolute
                  bottom-0
                  end-0
                  py-2
                  px-3
                "
                style="margin: 1px"
              >
                <h5 class="m-0">Online Marketing</h5>
                <small class="text-primary">49 Courses</small>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- Categories Start -->

    <!-- Courses Start -->
    <div class="container-xxl py-5" v-if="courses">
      <div class="container">
        <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 class="section-title bg-white text-center text-primary px-3">
            Courses
          </h6>
          <h1 class="mb-5">Popular Courses</h1>
        </div>
        <div class="row g-4 justify-content-center">
          <div
            v-for="(course, index) in courses.slice(0, 3)"
            :key="index"
            class="col-lg-4 col-md-6 wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <router-link class="d-block" :to="`/courses/${course.id}/learning`">
              <div class="course-item bg-light">
                <div class="position-relative overflow-hidden">
                  <img
                    class="img-fluid w-100"
                    :src="course.cover.file_url"
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
                    <small><font-awesome-icon icon="fa-solid fa-star" /></small>
                    <small><font-awesome-icon icon="fa-solid fa-star" /></small>
                    <small><font-awesome-icon icon="fa-solid fa-star" /></small>
                    <small><font-awesome-icon icon="fa-solid fa-star" /></small>
                    <small><font-awesome-icon icon="fa-solid fa-star" /></small>
                    <br />
                    <small>(123)</small>
                  </div>
                  <div class="course-title">
                    <h5 class="mb-4 text-666">
                      {{ course.name }}
                    </h5>
                  </div>
                </div>
                <div class="d-flex border-top">
                  <small class="flex-fill text-center border-end py-2"
                    ><font-awesome-icon icon="fa-solid fa-user-tie" />&nbsp;
                    {{ course.description }}</small
                  >
                  <small class="flex-fill text-center border-end py-2"
                    ><font-awesome-icon icon="fa-solid fa-clock" />&nbsp; 1.49
                    Hrs</small
                  >
                  <small class="flex-fill text-center py-2"
                    ><font-awesome-icon icon="fa-solid fa-user" />&nbsp;
                    Students</small
                  >
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
import coursesAPI from "@/api/admin/courses/index";
import billboardsAPI from "@/api/general/billboards/index";

export default {
  name: "HomeView",
  data() {
    return {
      prevLabel: `<svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="currentColor" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
						</svg>`,
      nextLabel: `<svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="currentColor" d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
						</svg>`,
      billboards: false,
      courses: false,
    };
  },
  methods: {
    async getCourses() {
      this.courses = await coursesAPI.getCourses(7, 1);
      this.courses = this.courses.courses;
      console.log(this.courses);
    },
    async getBillboards() {
      this.billboards = await billboardsAPI.getBillboards();
    },
  },
  created() {
    this.getBillboards();
    this.getCourses();
  },
  components: {
    Carousel,
    Slide,
  },
};
</script>
<style lang="scss">
/* MY STYLE */
/* CAROUSEL */
.home-carousel{
  .VueCarousel-wrapper{
    overflow: visible;
  }
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
  /*  Carousel */
  .carousel-caption {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(9, 30, 62, 0.7);
    z-index: 1;
  }
  .slide-caption {
    margin-top: 100px;
    h1 {
      font-weight: bold;
    }
    h5 {
      color: #06bbcc !important;
    }
    .btn-primary {
      background-color: #06bbcc;
      border: 1px solid #06bbcc;
    }
    .btn-primary:hover {
      background-color: #06bbcc;
      border: 1px solid #06bbcc;
      opacity: 0.8;
    }
  }
  @media (max-width: 576px) {
    .carousel-caption h5 {
      font-size: 14px;
      font-weight: 500 !important;
    }

    .carousel-caption h1 {
      font-size: 30px;
      font-weight: 600 !important;
    }
  }

  .carousel-control-prev,
  .carousel-control-next {
    width: 10%;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    width: 3rem;
    height: 3rem;
  }
}
/*** Categories & Courses ***/
.category img,
.course-item img {
  transition: 0.5s;
}
.category a,
.category small {
  color: #06bbcc;
}
.course-item small {
  color: #06bbcc;
}
.course-item h5 {
  font-weight: bold;
}
.category a:hover img,
.course-item:hover img {
  transform: scale(1.1);
}
.course-title {
  min-height: 75px;
}
</style>

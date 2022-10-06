<template>
  <main>
    <!-- CAROUSEL -->
    <carousel
      class="home-carousel"
      ref="carousel"
      :per-page="1"
      :navigationEnabled="true"
      :navigation-next-label="nextLabel"
      :navigation-prev-label="prevLabel"
      :loop="true"
      :mouse-drag="false"
    >
      <slide>
        <div class="owl-carousel-item position-relative">
          <img
            class="img-fluid w-100"
            src="../../assets/img/carousel/carousel-1.jpg"
            alt=""
          />
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
                    Best Online Courses
                  </h5>
                  <h1 class="display-3 text-white animated slideInDown">
                    The Best Online Learning Platform
                  </h1>
                  <p class="fs-5 text-white mb-4 pb-2">
                    Learners around the world are launching new careers,
                    advancing in their fields, and enriching their lives.
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
      <slide>
        <div class="owl-carousel-item position-relative">
          <img
            class="img-fluid w-100"
            src="../../assets/img/carousel/carousel-2.jpg"
            alt=""
          />
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
                    Best Online Courses
                  </h5>
                  <h1 class="display-3 text-white animated slideInDown">
                    Get Educated Online From Your Home
                  </h1>
                  <p class="fs-5 text-white mb-4 pb-2">
                    Learners around the world are launching new careers,
                    advancing in their fields, and enriching their lives.
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
    <div class="container-xxl py-5">
      <div class="container">
        <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 class="section-title bg-white text-center text-primary px-3">
            Courses
          </h6>
          <h1 class="mb-5">Popular Courses</h1>
        </div>
        <div class="row g-4 justify-content-center" >
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" v-for="index in 3" :key="index">
            <div class="course-item bg-light">
              <div class="position-relative overflow-hidden">
                <img
                  class="img-fluid"
                  :src="require(`@/assets/img/courses/course-${index}.jpg`)"
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
                    class="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
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
                  <small><font-awesome-icon icon="fa-solid fa-star" /></small>
                  <br />
                  <small>(123)</small>
                </div>
                <h5 class="mb-4">
                  Web Design & Development Course for Beginners
                </h5>
              </div>
              <div class="d-flex border-top">
                <small class="flex-fill text-center border-end py-2"
                  ><font-awesome-icon icon="fa-solid fa-user-tie" />&nbsp; John
                  Doe</small
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
          </div>
        </div>
      </div>
    </div>
     <!-- Service Start -->
    <div class="container-xxl py-5">
        <div class="container">
            <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px;">
                <h6 class="text-primary">Our Services</h6>
                <h1 class="mb-4">We Are Pioneers In The World Of Renewable Energy</h1>
            </div>
            <div class="row g-4">
                <div class="col-md-6 col-lg-4 wow fadeInUp" v-for="index in 3" :key="index" data-wow-delay="0.1s">
                    <div class="blog-item rounded overflow-hidden">
                        <img class="img-fluid" :src="require(`@/assets/img/blog/solar-${index}.jpg`)" alt="">
                        <div class="position-relative p-4 pt-0">
                            <div class="blog-icon">
                                <font-awesome-icon icon="fa-solid fa-solar-panel" />
                            </div>
                            <h4 class="mb-3">Solar Panels</h4>
                            <p>Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.</p>
                            <a class="small fw-medium" href="">Read More<i class="fa fa-arrow-right ms-2"></i></a>
                        </div>
                    </div>
                </div>
          </div>
    </div>
    </div>
    <!-- Service End -->
  </main>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";

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
      // news: [],
      // schedules: [],
      // courses: [],
      // tiptricks: [],
      // blogs: [],
    };
  },
  methods: {
    // modifyCarouselNavigation(buttons) {
    //   buttons[0].innerHTML = '<font-awesome-icon icon="fa-solid fa-greater-than" />'

    // },
    getCourses: async function () {
      this.courses = await this.axios
        .get("http://localhost:3000/courses")
        .then((res) => res.data);
    },
    getTip: async function () {
      this.tiptrick = await this.axios
        .get("http://localhost:3000/tiptrick")
        .then((res) => res.data);
    },
  },
  mounted() {
    // setTimeout(() => {
    //   this.modifyCarouselNavigation(
    //     this.$refs.carousel.$el.getElementsByClassName(
    //       "VueCarousel-navigation-button"
    //     )
    //   );
    // }, 0);
    // for (let i = 0; i < 5; i++) {
    //   this.news.push({
    //     id: 315 + i,
    //     title: "new" + i,
    //     description: "content" + i,
    //   });
    //   this.schedules.push({
    //     id: 215 + i,
    //     title: "new" + i,
    //     img: "link",
    //     subscribes: 445,
    //     views: 464,
    //     description: "content" + i,
    //   });
    //   this.courses.push({
    //     id: 315 + i,
    //     title: "new" + i,
    //     img: "link",
    //     subscribes: 445,
    //     views: 464,
    //     description: "content" + i,
    //   });
    //   this.tiptricks.push({
    //     id: 215 + i,
    //     title: "new" + i,
    //     img: "link",
    //     views: 264,
    //     description: "content" + i,
    //   });
    //   this.blogs.push({
    //     id: 215 + i,
    //     title: "new" + i,
    //     img: "link",
    //     views: 264,
    //     user: 55,
    //     description: "content" + i,
    //   });
    // }
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
.home-carousel .VueCarousel-wrapper {
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
/*** Service ***/
.blog-item {
  box-shadow: 0 0 45px rgba(0, 0, 0, 0.08);
}

.blog-icon {
  position: relative;
  margin: -50px 0 25px 0;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  background: #ffffff;
  border-radius: 100px;
  box-shadow: 0 0 45px rgba(0, 0, 0, 0.08);
  transition: 0.5s;
  font-size: 24px;
  cursor: pointer;
}

.blog-item:hover .blog-icon {
  color: #ffffff;
  background: var(--primary);
}
.blog-item {
  text-align: left;
}
.blog-item a {
  color: #06bbcc;
  text-decoration: none;
}
.blog-item p {
  color: #9b9b9b;
  text-align: left;
}
</style>

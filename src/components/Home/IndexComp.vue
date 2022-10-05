<template>
  <main>
    <div class="carousel-controls">
      <button class="prev-btn">
        <font-awesome-icon icon="fa-solid fa-less-than" />
      </button>
      <button class="next-btn">
        <font-awesome-icon icon="fa-solid fa-greater-than" />
      </button>
    </div>
    <carousel
      ref="carousel"
      :per-page="1"
      :navigationEnabled="true"
      :navigation-next-label="nextLabel"
      :navigation-prev-label="prevLabel"
      :loop="true"
      :adjustableHeight="true"
      :mouse-drag="false"
    >
      <slide>
        <div class="owl-carousel-item position-relative">
          <img class="img-fluid" src="img/carousel-1.jpg" alt="" />
          <div
            class="top-0 start-0 w-100 h-100 d-flex align-items-center"
            style="background: rgba(24, 29, 56, 0.7)"
          >
            <div class="container">
              <div class="row justify-content-start">
                <div class="col-sm-10 col-lg-8">
                  <h5
                    class="text-primary text-uppercase mb-3 animated slideInDown"
                  >
                    Best Online Courses
                  </h5>
                  <h1 class="display-3 text-white animated slideInDown">
                    The Best Online Learning Platform
                  </h1>
                  <p class="fs-5 text-white mb-4 pb-2">
                    Vero elitr justo clita lorem. Ipsum dolor at sed stet sit
                    diam no. Kasd rebum ipsum et diam justo clita et kasd rebum
                    sea sanctus eirmod elitr.
                  </p>
                  <a
                    href=""
                    class="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                    >Read More</a
                  >
                  <a
                    href=""
                    class="btn btn-light py-md-3 px-md-5 animated slideInRight"
                    >Join Now</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </slide>
      <slide>
        <div class="owl-carousel-item position-relative">
          <img class="img-fluid" src="img/carousel-2.jpg" alt="" />
          <div
            class="top-0 start-0 w-100 h-100 d-flex align-items-center"
            style="background: rgba(24, 29, 56, 0.7)"
          >
            <div class="container">
              <div class="row justify-content-start">
                <div class="col-sm-10 col-lg-8">
                  <h5
                    class="text-primary text-uppercase mb-3 animated slideInDown"
                  >
                    Best Online Courses
                  </h5>
                  <h1 class="display-3 text-white animated slideInDown">
                    Get Educated Online From Your Home
                  </h1>
                  <p class="fs-5 text-white mb-4 pb-2">
                    Vero elitr justo clita lorem. Ipsum dolor at sed stet sit
                    diam no. Kasd rebum ipsum et diam justo clita et kasd rebum
                    sea sanctus eirmod elitr.
                  </p>
                  <a
                    href=""
                    class="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                    >Read More</a
                  >
                  <a
                    href=""
                    class="btn btn-light py-md-3 px-md-5 animated slideInRight"
                    >Join Now</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </slide>
      <slide> C </slide>
    </carousel>
    <div v-for="(item, index) in news" :key="index" class="billboard">
      <h1>{{ item.title }}</h1>
      <h1>{{ item.id }}</h1>
      <p>{{ item.img }}</p>
      <p>
        {{ item.description }}
      </p>
      <button>Learn more</button>
    </div>
    <div class="courses">
      <section class="front-end">
        <h1>Schedule</h1>
        <div class="row">
          <div v-for="(item, index) in schedules" :key="index">
            <div class="course-card">
              <p>ID:{{ item.id }}</p>
              <p>Title:{{ item.title }}</p>
              <p>Des: {{ item.description }}</p>
              <p>IMG: {{ item.img }}</p>
              <p>SUBS: {{ item.subscribes }}</p>
              <p>VIEWS: {{ item.views }}</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h1>Course</h1>
        <div class="row">
          <div class="col-4" v-for="(item, index) in schedules" :key="index">
            <div class="course-card">
              <p>ID:{{ item.id }}</p>
              <p>Title:{{ item.title }}</p>
              <p>Des: {{ item.description }}</p>
              <p>IMG: {{ item.img }}</p>
              <p>SUBS: {{ item.subscribes }}</p>
              <p>VIEWS: {{ item.views }}</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h1>Tip and Trick</h1>
        <div class="row">
          <div class="col-4" v-for="(item, index) in tiptricks" :key="index">
            <div class="course-card">
              <p>ID:{{ item.id }}</p>
              <p>Title:{{ item.title }}</p>
              <p>Des: {{ item.description }}</p>
              <p>IMG: {{ item.img }}</p>
              <p>SUBS: {{ item.subscribes }}</p>
              <p>VIEWS: {{ item.views }}</p>
            </div>
          </div>
        </div>
      </section>
      <section class="bloga">
        <h1>Blog</h1>
        <div class="row">
          <div class="col-4" v-for="(item, index) in blogs" :key="index">
            <div class="course-card">
              <p>ID:{{ item.id }}</p>
              <p>Title:{{ item.title }}</p>
              <p>Des: {{ item.description }}</p>
              <p>IMG: {{ item.img }}</p>
              <p>{{ item.user }}</p>
              <p>VIEWS: {{ item.views }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- <div class="blog">
        <div class="col-4">
          <div class="blog-card">
            <div class="author"></div>
            <img :src="course.img" alt="" />
            <div class="card-body">
              <h4></h4>
              <span>{{ course.price | moneyDelimit }} VND</span>
            </div>
            <div class="card-tag">
              <span class="badge"></span>
            </div>
          </div>
        </div>
      </div> -->
  </main>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "HomeView",
  data() {
    return {
      prevLabel:`<svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="currentColor" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
						</svg>`,
      nextLabel: `<svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="currentColor" d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
						</svg>`,
      news: [],
      schedules: [],
      courses: [],
      tiptricks: [],
      blogs: [],
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
    for (let i = 0; i < 5; i++) {
      this.news.push({
        id: 315 + i,
        title: "new" + i,
        description: "content" + i,
      });
      this.schedules.push({
        id: 215 + i,
        title: "new" + i,
        img: "link",
        subscribes: 445,
        views: 464,
        description: "content" + i,
      });
      this.courses.push({
        id: 315 + i,
        title: "new" + i,
        img: "link",
        subscribes: 445,
        views: 464,
        description: "content" + i,
      });
      this.tiptricks.push({
        id: 215 + i,
        title: "new" + i,
        img: "link",
        views: 264,
        description: "content" + i,
      });
      this.blogs.push({
        id: 215 + i,
        title: "new" + i,
        img: "link",
        views: 264,
        user: 55,
        description: "content" + i,
      });
    }
  },
  components: {
    Carousel,
    Slide,
  },
};
</script>
<style>
/* MY STYLE */
.prev-btn,
.next-btn {
  background-color: #aaa;
  color: white;
  border: white;
}
/* CAROUSEL */
.VueCarousel-navigation-prev {
  display: inline !important;
  width: 30px !important;
  right: 40px !important;
  transform: translateY(-50%) translateX(0%)!important;
}
.VueCarousel-navigation-next {
  transform: translateY(-50%) translateX(-51%) !important;
}
.VueCarousel-navigation-button svg {
  width: 20px !important;
  height: 20px !important;
  color: white;
}
section div,
.billboard {
  border: 1px solid #555;
  margin: 5px;
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
</style>

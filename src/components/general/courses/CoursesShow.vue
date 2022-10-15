<template>
  <div class="courses-show d-flex mt-3 justify-content-between" v-if="lessons">
    <div class="main-section">
      <!-- YOUTUBE IFRAME -->
      <section class="video">
        <div class="border-radius-9 overflow-hidden">
          <youtube
            :width="'100%'"
            :height="'100%'"
            :video-id="lessons[currentIndex].url"
            ref="youtube"
          ></youtube>
        </div>
      </section>
      <!-- INTERACTION -->
      <div>
        <!-- NAV-BUTTON -->
        <ul class="d-flex nav-buttons">
          <li
            @click="navButton = 'overview'"
            :class="{ active: navButton == 'overview' }"
            class="px-4 py-2 col-6 text-center"
          >
            <h4 class="fw-bold text-secondary mb-0">Overview</h4>
          </li>
          <li
            @click="navButton = 'review'"
            :class="{ active: navButton == 'review' }"
            class="px-4 py-2 col-6 text-center"
          >
            <h4 class="fw-bold text-secondary mb-0">Review</h4>
          </li>
        </ul>
        <!-- OVER VIEW -->
        <section v-if="navButton == 'overview'">
          <h5 class="fw-bold">{{ lessons[currentIndex].name }}</h5>
          <p>{{ lessons[currentIndex].description }}</p>
        </section>
        <!-- REVIEW -->
        <section v-if="navButton == 'review'">
            <!-- NEW REVIEW START-->
            <div class="mb-3">
              <h5 class="fw-bold">Rate this course</h5>
              <h3 class="text-white me-2">
                  <i class="me-1 cursor-pointer star-icon" ><font-awesome-icon icon="fa-solid fa-star" /> </i>
                  <i class="me-1 cursor-pointer star-icon" @mouseover="hoverStar($event.currentTarget,1)"><font-awesome-icon icon="fa-solid fa-star" /></i>
              </h3>
            </div>
            <div>
              <h6 class="fw-bold">Describe your experience :</h6>
              <div class="mb-2">
                <textarea
                id="comment"
                class="w-100 border-radius-6"
                rows="2"
              ></textarea>
              </div>
              <div class="text-center"><button class="btn btn-primary px-2 py-0" @click="postComment">POST</button></div>
            </div>
            <!-- NEW REVIEW END-->

            <!-- REVIEW LIST START-->
            <ul class="review-list">
              <li class="text-start d-flex py-3 px-1 align-items-center">
                <div class="col-1">
                  <img src="https://i.pravatar.cc/150?img=21" alt="" />
                </div>
                <div class="col-11">
                  <h6 class="fw-bold mb-1">Annie</h6>
                  <p class="mb-1">
                    <span class="text-star me-2">
                      <i><font-awesome-icon icon="fa-solid fa-star" /> </i>
                      <i><font-awesome-icon icon="fa-regular fa-star" /></i>
                    </span>
                    <span class="text-secondary">2 weeks ago</span>
                  </p>
                  <span
                    >The course is really wonderful, with lots of clarity and
                    examples.</span
                  >
                </div>
              </li>
              <li class="text-start d-flex py-3 px-1">
                <div class="col-1">
                  <img src="https://i.pravatar.cc/150?img=21" alt="" />
                </div>
                <div class="col-11">
                  <h6 class="fw-bold mb-1">Annie</h6>
                  <p class="mb-1">
                    <i
                      ><font-awesome-icon icon="fa-solid fa-star" />
                      <font-awesome-icon icon="fa-regular fa-star"
                    /></i>
                    <span class="text-secondary">2 weeks ago</span>
                  </p>
                  <span
                    >The course is really wonderful, with lots of clarity and
                    examples.</span
                  >
                </div>
              </li>
            </ul>
            <!-- REVIEW LIST END -->
        </section>
      </div>
    </div>
    <!-- LIST LESSONS -->
    <div class="track-section text-start border-radius-9">
      <div class="">
        <h3 class="px-3 py-3 mb-0 text-center">Course content</h3>
      </div>
      <ul>
        <li
          v-for="(lesson, index) in lessons"
          :key="lesson.id"
          @click="currentIndex = index"
          :class="{ 'bg-primary-blur': index == currentIndex }"
          class="d-flex align-items-center gap-4 border-primary-blur cursor-pointer hover-primary px-3 py-3"
        >
          <div class="">
            <input type="checkbox" />
          </div>
          <div>
            <p class="fw-bold mb-2">{{ lesson.name }}</p>
            <p class="mb-0">
              <span class="text-primary me-2"
                ><font-awesome-icon icon="fa-solid fa-circle-play"
              /></span>
              {{ lesson.duration }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      // VIDEO
      currrentTime: 0,
      count: 0,
      duration: 0,
      lessonsStatus: {},
      user: [],
      time: 0,
      intervalID: 2,
      test: false,
      currentIndex: 0,
      // NAVBUTTON
      navButton: "overview",
      // REVIEW
      // new review
      newReview:{
        rating:0,
        content:""
      }
    };
  },
  computed: {
    ...mapState("homeCourses", {
      lessons: (state) => state.lessonsData,
      courses: (state) => state.coursesData,
    }),
  },
  methods: {
    // CALL API
    ...mapActions("homeCourses", ["getLessons"]),
    // REVIEW
    showSubComment(target) {
      let element = target.parentNode.querySelector(".sub-comment");
      element.style.display =
        element.style.display == "block" ? "none" : "block";
    },
    showReply(target) {
      let element = target.parentNode.querySelector(".reply");
      element.style.display = "block";
    },
    postComment() {
      this.axios
        .post("http://localhost:3000/comments", {
          content: this.newComment,
          children: [],
        })
        .then(() => {
          this.newComment = "";
          this.axios
            .get("http://localhost:3000/comments")
            .then((res) => (this.comments = res.data));
        });
    },
    reply(id) {
      this.axios.put(`http://localhost:3000/comments/${id}`, {
        children: [{}],
      });
    },
    // RATING
    hoverStar(el,index){
      console.log(el)
      let elements = el.parentNode.children
      let i = 0
      while ( i <= index){
        elements[i].classList.add("filled-star")
        i++
      }
    }
  },
  created() {
    this.getLessons();
  },
  mounted() {},
};
</script>

<style scoped>
.main-section {
  width: 70%;
}
ul {
  padding: 0;
}
.courses-show {
  max-width: 1200px;
  margin: auto;
}
/* TRACK SECTION */
.track-section {
  width: 28%;
  border: 1px solid var(--primary-blur);
  overflow-y: scroll;
}
.track-section ul {
  margin-bottom: 0;
}
.suggestion {
  height: 300px;
}
/* VIDEO */
.video {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}
.video > div {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
/* NAV BUTTON */
.nav-buttons li {
  cursor: pointer;
}
.nav-buttons li:hover h4 {
  color: #333 !important;
}
.nav-buttons li.active {
  border-bottom: 1px solid #ccc;
  color: #333 !important;
}
.nav-buttons li.active h4 {
  color: #333 !important;
}

::-webkit-scrollbar {
  width: 5px;
  background-color: var(--primary);
  border-radius: 9px;
}
/* REVIEW */
.new-review {
}
.review-list {
}
.review-list li {
  border-bottom: 1px solid #ccc;
}
.review-list li img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
.comment {
  background-color: darkslategray;
  color: white;
}
/* review stars */
.star-icon path{
  stroke-width: 30;
  stroke: var(--star);
}
.filled-star{
  color: var(--star) !important;
}
</style>

<template>
  <div v-if="course">
    <div class="text-center courses-title bg-primary py-2 mb-4">
      <h4 class="fw-bold text-white m-0">{{ course.name }}</h4>
    </div>
    <div
      class="courses-show d-flex mt-3 justify-content-between"
      v-if="lessons"
    >
      <div class="main-section">
        <!-- YOUTUBE IFRAME -->
        <section class="video">
          <div class="border-radius-9 overflow-hidden">
            <youtube
              @ready="setPlayer"
              :width="'100%'"
              :height="'100%'"
              :video-id="getId(lessons[currentIndex].url)"
              ref="youtube"
            ></youtube>
          </div>
        </section>
        <!-- INTERACTION -->
        <div>
          <!-- NAV-BUTTON -->
          <ul class="d-flex secondary-style-nav">
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
            <div class="mb-3" v-if="!yourReview">
              <h5 class="fw-bold">Rate this course</h5>
              <h3 class="text-white me-2">
                <i
                  v-for="(e, index) in 5"
                  :key="index"
                  :class="{ 'click-filled': index < newReview.rating }"
                  class="pe-1 cursor-pointer star-icon"
                  @mouseover="hoverStar($event.currentTarget, index)"
                  @mouseout="emptyStar($event.currentTarget)"
                  @click="newReview.rating = index + 1"
                  ><font-awesome-icon icon="fa-solid fa-star" />
                </i>
              </h3>
              <div>
                <h6 class="fw-bold">Describe your experience :</h6>
                <div class="mb-2">
                  <textarea
                    id="comment"
                    class="w-100 border-radius-6"
                    rows="2"
                    v-model="newReview.content"
                  ></textarea>
                </div>
                <div class="text-center">
                  <button
                    class="btn btn-primary px-2 py-0 mx-1"
                    @click="postReview(newReview)"
                  >
                    POST
                  </button>
                </div>
              </div>
            </div>
            <!-- NEW REVIEW, UPDATE END-->

            <!-- UPDATE REVIEW START-->
            <div class="mb-3" v-if="yourReview && !yourReviewShow">
              <h5 class="fw-bold">Rate this course</h5>
              <h3 class="text-white me-2">
                <i
                  v-for="(e, index) in 5"
                  :key="index"
                  :class="{ 'click-filled': index < yourReview.rating }"
                  class="pe-1 cursor-pointer star-icon"
                  @mouseover="hoverStar($event.currentTarget, index)"
                  @mouseout="emptyStar($event.currentTarget)"
                  @click="yourReview.rating = index + 1"
                  ><font-awesome-icon icon="fa-solid fa-star" />
                </i>
              </h3>
              <div>
                <h6 class="fw-bold">Describe your experience :</h6>
                <div class="mb-2">
                  <textarea
                    id="comment"
                    class="w-100 border-radius-6"
                    rows="2"
                    v-model="yourReview.content"
                  ></textarea>
                </div>
                <div class="text-center">
                  <button
                    class="btn btn-primary px-2 py-0 mx-1"
                    @click="updateReview(yourReview)"
                  >
                    UPDATE
                  </button>
                  <button
                    v-if="yourReview"
                    class="btn btn-secondary px-2 py-0 mx-1"
                    @click="
                      yourReviewShow = true;
                      Object.assign(yourReview, yourReviewBeforeEdit);
                    "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <!-- UPDATE REVIEW END-->

            <!-- YOUR REVIEW START-->
            <ul class="review-list" v-show="yourReviewShow" v-if="yourReview">
              <h5 class="fw-bold mb-0">Your review</h5>
              <li
                class="
                  text-start
                  d-flex
                  py-3
                  px-1
                  align-items-center
                  border-bottom-primary-blur
                "
              >
                <div class="col-1">
                  <img :src="yourReview.avatar" alt="" />
                </div>
                <div class="col-11">
                  <h6 class="fw-bold mb-1">{{ yourReview.username }}</h6>
                  <p class="mb-1">
                    <span class="text-white me-2">
                      <i
                        v-for="(e, index) in 5"
                        :key="index"
                        :class="{
                          'click-filled': index <= yourReview.rating - 1,
                        }"
                        class="pe-1 cursor-pointer star-icon"
                        ><font-awesome-icon icon="fa-solid fa-star" />
                      </i>
                    </span>
                    <span class="text-secondary">2 weeks ago</span><br />
                  </p>
                  <span>{{ yourReview.content }}</span
                  ><br />
                  <button
                    @click="yourReviewShow = false"
                    class="btn fst-italic text-primary pt-3 pb-1 ps-0"
                  >
                    <i
                      ><font-awesome-icon icon="fa-solid fa-pen-to-square"
                    /></i>
                    Edit your review
                  </button>
                </div>
              </li>
            </ul>
            <!-- YOUR REVIEW END -->
            <!-- REVIEW STATISTIC START -->
            <div class="mb-3 border-bottom-primary-blur pb-4">
              <h5 class="fw-bold mb-3">Student feedback</h5>

              <div class="d-flex align-items-center">
                <div class="col-2 text-center">
                  <h1 class="fw-bold">{{ stats.average }}</h1>
                  <span class="text-star ps-1">
                    <i
                      v-for="index in 5"
                      :key="index"
                      class="pe-1 cursor-pointer star-icon"
                    >
                      <!-- select the star icon according to the rating number -->
                      <font-awesome-icon
                        :icon="
                          stats.average - index > 0
                            ? 'fa-solid fa-star'
                            : stats.average - index > -1
                            ? 'fa-solid fa-star-half-stroke'
                            : 'fa-regular fa-star'
                        "
                      />
                    </i>
                  </span>
                </div>
                <div class="col-10">
                  <div
                    v-for="row in 5"
                    :key="row"
                    class="row g-0 align-items-center"
                  >
                    <div class="col-8 ps-2">
                      <div class="progress">
                        <div
                          class="progress-bar bg-primary"
                          :style="{ width: stats.percent[row - 1] + '%' }"
                          role="progressbar"
                          aria-valuenow="0"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div class="col-3 text-star">
                      <span class="ms-4">
                        <i
                          v-for="index in 5"
                          :key="index"
                          class="pe-1 cursor-pointer star-icon"
                        >
                          <!-- select the star icon according to the rating number -->
                          <font-awesome-icon
                            :icon="
                              6 - row >= index
                                ? 'fa-solid fa-star'
                                : 'fa-regular fa-star'
                            "
                          />
                        </i>
                      </span>
                    </div>
                    <div class="col-1">
                      <span class="text-secondary">
                        {{ stats.percent[row - 1] }}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- REVIEW STATISTIC END -->
            <!-- REVIEW LIST START-->
            <ul class="review-list">
              <h4 class="fw-bold">Others</h4>
              <li
                v-for="(review, idx) in reviews"
                :key="idx"
                class="
                  text-start
                  d-flex
                  py-3
                  px-1
                  align-items-center
                  border-bottom
                "
              >
                <div class="col-1">
                  <img :src="review.avatar" alt="" />
                </div>
                <div class="col-11">
                  <h6 class="fw-bold mb-1">{{ review.username }}</h6>
                  <p class="mb-1">
                    <span class="text-white me-2">
                      <i
                        v-for="(e, index) in 5"
                        :key="index"
                        :class="{ 'click-filled': index <= review.rating - 1 }"
                        class="pe-1 cursor-pointer star-icon"
                        ><font-awesome-icon icon="fa-solid fa-star" />
                      </i>
                    </span>
                    <span class="text-secondary">2 weeks ago</span>
                  </p>
                  <span>{{ review.content }}</span>
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
          <div class="">
            <h3 class="px-3 py-3 mb-0 text-center">Course content</h3>
          </div>
          <ul>
            <li
              v-for="(lesson, index) in lessons"
              :key="lesson.id"
              @click="currentIndex = index"
              :class="{ 'bg-primary-blur': index == currentIndex }"
              class="border-primary-blur cursor-pointer hover-primary"
            >
              <div class="row align-items-center g-0 py-3">
                <div class="col-2">
                  <label class="container" @click.stop="">
                    <input
                      type="checkbox"
                      @change="updateLesson(lesson)"
                      v-model="lesson.done"
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="col-10">
                  <p class="fw-bold mb-2">
                    {{
                      (index + 1 > 9 ? index + 1 : "0" + (index + 1)) +
                      " - " +
                      lesson.name
                    }}
                  </p>
                  <p class="mb-0">
                    <span class="text-primary me-2"
                      ><font-awesome-icon icon="fa-solid fa-circle-play"
                    /></span>
                    {{ secondsToHms(parseInt(lesson.duration)) }}
                  </p>
                </div>
              </div>
              <div v-for="(quiz, index2) in quizzes" :key="index2" @click.stop="">
                <router-link class="text-white bg-primary d-block text-center py-1 fw-bold"
                  v-if="quiz.lesson_id == lesson.id"
                  to="/quizzes/1"
                >
                  Quiz : {{quiz.name}}
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import adminCourseAPI from "@/api/admin/courses/index";
import API from "@/api/general/courses/index";
import timeString from "@/mixin/timeString";
import youtubeId from "@/mixin/youtube_id";

export default {
  data() {
    return {
      // COURSE
      course: false,
      // VIDEO
      currrentTime: 0,
      trackingInterval: 2,
      currentIndex: 0,
      // NAVBUTTON
      navButton: "overview",
      // REVIEW
      // stats
      stats: false,
      // new review
      newReview: {
        rating: -1,
        content: "",
      },
      // your review
      yourReview: false,
      yourReviewShow: true,
      yourReviewBeforeEdit: {},
      // new review
      formShow: true,
      // LESSONS
      lessons: false,
      // QUiZS
      quizzes: false,
      quiz_index: 0,
    };
  },
  computed: {
    course_id() {
      return this.$route.params.id;
    },
  },
  methods: {
    // YOUTUBE API
    async setPlayer() {
      let el = this;
      this.player = this.$refs.youtube.player;
      this.player.addEventListener("onStateChange", function (e) {
        if (el.lessons[el.currentIndex].done == true) {
          clearInterval(el.trackingInterval);
        } else if (e.data == 1)
          el.trackingInterval = setInterval(el.tracking, 2000);
        else clearInterval(el.trackingInterval);
      });
    },
    async tracking() {
      let el = this;
      el.currrentTime = await el.player.getCurrentTime();
      console.log(10);
      if (this.currrentTime > this.lessons[this.currentIndex].duration * 0.75) {
        clearInterval(el.trackingInterval);
        el.lessons[el.currentIndex].done = true;
        el.updateLesson(el.lessons[el.currentIndex]);
      }
    },
    // API CALL
    async getCourse() {
      this.course = await adminCourseAPI.showCourse(this.course_id);
      this.lessons = this.course.lessons;
      this.quizzes = this.course.quizzes;
      console.log(this.course);
    },
    async updateLesson(data) {
      await API.updateLesson(data, data.id);
      this.getLessons();
    },
    async getReviews() {
      this.reviews = await API.getReviews();
    },
    async getYourReview() {
      this.yourReview = await API.getYourReview();
      Object.assign(this.yourReviewBeforeEdit, this.yourReview);
    },
    async getStats() {
      this.stats = await API.getStats();
    },
    async postReview(data) {
      await API.postReview(data);
      this.getReviews();
      this.getYourReview();
    },
    async updateReview(data) {
      await API.updateReview(data, data.id);
      this.getReviews();
      this.getYourReview();
      this.yourReviewShow = true;
    },
    // REVIEW
    // RATING
    hoverStar(el, index) {
      let elements = el.parentNode.children;
      let i = 0;
      while (i <= index) {
        elements[i].classList.add("hover-filled");
        i++;
      }
    },
    emptyStar(el) {
      let elements = el.parentNode.children;
      let i = 0;
      while (i <= 4) {
        elements[i].classList.remove("hover-filled");
        i++;
      }
    },
  },
  mixins: [timeString, youtubeId],
  created() {
    this.getCourse();
    this.getReviews();
    this.getYourReview();
    this.getStats();
  },
  mounted() {
    // let el = this
    //   this.player = this.$refs.youtube.player;
    //   console.log(10)
    //   this.player.addEventListener("onStateChange",async function (e) {
    //     if(e.data==2)
    //       {
    //         let durex = await el.player.getDuration()
    //         el.axios.put(`api/v1/admin/courses/22/lessons/${el.lessons[el.currentIndex].id}}`,{duration:durex})
    //         el.currentIndex++
    //       }
    //   });
  },
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
  overflow: hidden;
  max-height: 630px;
}
.track-section > div {
  height: 100%;
  overflow-y: scroll;
}
.track-section ul {
  margin-bottom: 0;
}
.suggestion {
  height: 300px;
}
/* INPUT CHECKBOX css */
.container {
  display: block;
  position: relative;
  padding-left: 20px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 18px;
  width: 18px;
  transform: translate(-50%, -50%);
  border: 1px solid #999;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: var(--primary);
  border: 0;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 5px;
  top: 0px;
  width: 8px;
  height: 13px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
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
::-webkit-scrollbar-thumb {
  background-color: var(--primary);
  width: 6px;
  z-index: 10;
  border-radius: 9px;
}
::-webkit-scrollbar {
  width: 6px;
  background-color: white;
}

/* REVIEW */
.review-list li img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
.comment {
  background-color: darkslategray;
  color: white;
}
/* prgressbar */
.progress {
  height: 12px;
}

/* btn */
.btn {
  border: 0;
}
</style>

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
          <li @click="navButton='overview'" :class="{active:navButton=='overview'}" class="px-4 py-2 col-6 text-center "><h4 class="fw-bold text-secondary mb-0">Overview</h4></li>
          <li @click="navButton='review'" :class="{active:navButton=='review'}" class="px-4 py-2 col-6 text-center "><h4 class="fw-bold text-secondary mb-0">Review</h4></li>
        </ul>
        <!-- OVER VIEW -->
        <section v-if="navButton=='overview'">
          <h5 class="fw-bold">{{ lessons[currentIndex].name }}</h5>
          <p >{{ lessons[currentIndex].description }}</p>
        </section>
        <!-- REVIEW -->
        <section v-if="navButton=='review'">
          <h4>Review</h4>
          <div></div>
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
          class="
            d-flex
            align-items-center
            gap-4
            border-primary-blur
            cursor-pointer
            px-3
            py-3
          "
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
      navButton:"overview",
      currrentTime: 0,
      count: 0,
      duration: 0,
      lessonsStatus: {},
      user: [],
      time: 0,
      intervalID: 2,
      test: false,
      currentIndex: 0,
    };
  },
  computed: {
    ...mapState("homeCourses", {
      lessons: (state) => state.lessonsData,
      courses: (state) => state.coursesData,
    }),
  },
  methods: {
    ...mapActions("homeCourses", ["getLessons"]),
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
  overflow-y:scroll;
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
.nav-buttons li{
  cursor: pointer;
}
.nav-buttons li:hover h4{
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
</style>
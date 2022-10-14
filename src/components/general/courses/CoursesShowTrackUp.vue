<template>
  <div class="courses-show d-flex mt-3 justify-content-between">
    <div class="main-section">
      <section class="video">
        <div>
          <youtube
            :width="'100%'"
            :height="'100%'"
            @ready="playing"
            :video-id="
              lessons[currentId] ? lessons[currentId].video : lessons[0].video
            "
            ref="youtube"
          ></youtube>
        </div>
      </section>
      <section class="video-title">
        <h3>Lesson title</h3>
        <p>Lesson description</p>
      </section>
      <section class="video-review">
        <h4>Review</h4>
        <div>
          
        </div>
      </section>
      <div class="suggestion"></div>
    </div>
    <div class="track-section text-start">
      <div class="">
        <h3>Course content</h3>
      </div>
      <ul>
        <li
          v-for="(lesson, index) in lessons"
          :key="lesson.id"
          @click="selection(index)"
          :class="{
            active: index == currentId,
            'bg-salmon': index >= currentQualified,
          }"
          class="d-flex align-items-center">
          <div class="">
            <input type="checkbox" />
          </div>
          <div>
            <p class="fw-bold">Lesson Title</p>
            <p>
              <span><font-awesome-icon icon="fa-solid fa-circle-play" /></span>
              Lesson duration
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script> 
import {mapState,mapActions} from 'vuex'

export default {
  data() {
    return {
      currrentTime: 0,
      count: 0,
      duration: 0,
      lessonsStatus: {},
      user: [],
      time: 0,
      intervalID: 2,
      test: false,
      currentId: 0
    };
  },
  computed: {
    ...mapState("homeCourses",{
      courses:state => state.coursesData,
      lessons: state => state.lessonsData
    })
  },
  methods: {
    counter() {
      let el = this;
      el.intervalID = setInterval(function () {
        el.checking();
        el.$refs.youtube.player
          .getCurrentTime()
          .then((res) => (el.currrentTime = res));
      }, 2000);
    },
    //
    selection(index) {
      clearInterval(this.intervalID);
      if (index == this.currentId) return;
      else if (index >= this.currentQualified)
        alert("you need to study carefully the previous video");
      else {
        clearInterval(this.intervalID);
        this.currentId = index;
        this.count = this.lessonsStatus[this.currentId].count;
        if (this.count.length > 0) {
          this.$refs.youtube.player.addEventListener(
            "onStateChange",
            this.handler
          );
        }
        setTimeout(this.getDuration, 2000);
      }
    },
    //
  },
  created() {
    this.getLessons();
    this.getCourses();
  },
  mounted() {},
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 15px;
}
ul.active {
  background-color: rgb(240, 240, 240);
}
.bg-salmon {
  background-color: rgba(243, 119, 119, 0.514);
  cursor: not-allowed;
}
.main-section {
  width: 70%;
}
.courses-show {
  max-width: 1200px;
  margin: auto;
}
.track-section {
  width: 28%;
  border: 1px solid #ddd;
}
.suggestion {
  height: 300px;
}
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
</style>
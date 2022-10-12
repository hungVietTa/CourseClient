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
      lessons: [
        {
          id: 1,
          name: "Ruby - Part 1",
          des: "This is description",
          img: "https://i.ytimg.com/vi/4PLg-Oe3MfA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBuYdpe5BCIlLB4o68i8tiOgZIzcQ",
          video: "wkNR1hG4yOk",
          course_id: "1",
        },
        {
          id: 4,
          name: "Ruby - Part 1",
          des: "This is description",
          img: "https://i.ytimg.com/vi/4PLg-Oe3MfA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBuYdpe5BCIlLB4o68i8tiOgZIzcQ",
          video: "wkNR1hG4yOk",
          course_id: "1",
        },
        {
          id: 3,
          name: "Ruby - Part 1",
          des: "This is description",
          img: "https://i.ytimg.com/vi/4PLg-Oe3MfA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBuYdpe5BCIlLB4o68i8tiOgZIzcQ",
          video: "wkNR1hG4yOk",
          course_id: "1",
        },
        {
          id: 2,
          name: "Ruby - Part 1",
          des: "This is description",
          img: "https://i.ytimg.com/vi/4PLg-Oe3MfA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBuYdpe5BCIlLB4o68i8tiOgZIzcQ",
          video: "wkNR1hG4yOk",
          course_id: "1",
        },
      ],
      currentId: 0,
    };
  },
  computed: {
    currentQualified() {
      if (!this.lessonsStatus.length) return 999;
      let tmp = this.lessonsStatus.findIndex((item) => item.qualified == false);
      if (tmp == -1) return 999;
      return tmp;
    },
  },
  methods: {
    async getDuration() {
      await this.$refs.youtube.player
        .getDuration()
        .then((res) => (this.duration = res));
    },
    //
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
    checking() {
      console.log(this.count[0] * this.duration);
      if (this.count.length == 0) {
        this.$refs.youtube.player.removeEventListener(
          "onStateChange",
          this.handler
        );
        this.lessonsStatus[this.currentId + 1].qualified = true;
        console.log(2);
        clearInterval(this.intervalID);
        return;
      }
      let tmp = this.count.findIndex(
        (item) => Math.abs(item * this.duration - this.currrentTime) <= 3
      );
      if (tmp != -1) {
        this.count.splice(tmp, 1);
        this.updateCount();
      }
    },
    //
    updateCount() {
      this.lessonsStatus[this.currentId].count = this.count;
      this.axios.put(`http://localhost:4000/users/1`, this.user);
    },
    //
    handler: function (e) {
      if (e.data == 1) this.counter();
      if (e.data == 2 || e.data == 0) clearInterval(this.intervalID);
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
    playing() {
      console.log(2);
    },
    getLessons: async function () {
      this.lessons = await this.axios
        .get("http://localhost:4000/lessons")
        .then((res) => res.data);
    },
    getStatus: async function () {
      this.user = await this.axios
        .get("http://localhost:4000/users/1")
        .then((res) => res.data);
      //
      this.lessonsStatus = this.user.courses[0].lessons;
      //
      this.count = this.lessonsStatus[this.currentId].count;
      if (this.count.length > 0) {
        this.$refs.youtube.player.addEventListener(
          "onStateChange",
          this.handler
        );
      }
      setTimeout(this.getDuration, 2000);
    },
  },
  created() {
    this.getLessons();
    this.getStatus();
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
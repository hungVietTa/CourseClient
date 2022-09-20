<template>
  <div>
    <HeaderLearningComp />
    <main>
      <youtube
        :video-id="
          lessons[currentId] ? lessons[currentId].video : lessons[0].video
        "
        ref="youtube"
      ></youtube>
      <section class="list">
        <ul
          v-for="(lesson, index) in lessons"
          :key="lesson.id"
          @click="selection(index)"
          :class="{
            active: index == currentId,
            'bg-salmon': index >= currentQualified,
          }"
        >
          <li>{{ lesson.name }}</li>
          <li><img :src="lesson.img" alt="" /></li>
          <li>{{ lesson.des }}</li>
        </ul>
      </section>
    </main>
  </div>
</template>
<script>
import HeaderLearningComp from "../components/HeaderLearningComp.vue";
export default {
  data() {
    return {
      flag:false,
      currrentTime: 0,
      count: 0,
      duration: 0,
      lessonsStatus: [],
      user: [],
      time: 0,
      intervalID: 0,
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
      ],
      currentId: 0,
    };
  },
  computed: {
    currentQualified() {
      let tmp = this.lessonsStatus.findIndex((item) => item.qualified == false);
      if (tmp == -1) return 999;
      return tmp;
    },
  },
  methods: {
    getDuration() {
      this.$refs.youtube.player
        .getDuration()
        .then((res) => (this.duration = res));
    },
    //
    counter() {
      this.intervalID = setInterval(this.checking, 2000);
    },
    //
    checking() {
      console.log(this.duration * this.count[0]);
      this.$refs.youtube.player
        .getCurrentTime()
        .then((res) => (this.currrentTime = res));
      let tmp = this.count.findIndex(
        (item) => Math.abs(item * this.duration - this.currrentTime) <= 3
      );
      if (tmp != -1) {
        this.count.splice(tmp, 1);

        if (this.count.length == 0) {
          this.lessonsStatus[this.currentId + 1].qualified = true;
          this.lessonsStatus[this.currentId].count = this.count;
          this.axios.put(`http://localhost:3000/users/1`, this.user);
          this.unsetHandler();
          return;
        }
        this.lessonsStatus[this.currentId].count = this.count;
        this.axios.put(`http://localhost:3000/users/1`, this.user);
      }
    },
    //
    selection(index) {
      if (index == this.currentId) return;
      if (index >= this.currentQualified)
        alert("Please see carefully previous video");
      else {
        this.currentId = index;
        this.doAll(index);
      }
    },
    setHandler() {
      let el = this;
      window.learningTrackHandler = function (e) {
        if (e.data == -1) el.getDuration();
        if (e.data == 1) el.counter();
        if (e.data == 2 || e.data == 0) clearInterval(el.intervalID);
      };
    },
    //
    unsetHandler() {
      let el = this;
      clearInterval(this.intervalID);
      window.learningTrackHandler = function (e) {
        if (e.data == -1) el.getDuration();
      };
    },
    //
    doAll(index) {
      // Whether all stages reached
      this.count = this.lessonsStatus[index].count;
      //
      if (!this.count.length) this.unsetHandler();
      else {
        this.setHandler();
        if  ( this.flag )
            return
        this.flag = false
        this.$refs.youtube.player.addEventListener(
        "onStateChange",
        "learningTrackHandler"
      );
      }
    },
    getLessons: async function () {
      this.lessons = await this.axios
        .get("http://localhost:3000/lessons")
        .then((res) => res.data);
    },
    getStatus: async function () {
      this.user = await this.axios
        .get("http://localhost:3000/users/1")
        .then((res) => res.data);
      //
      this.lessonsStatus = this.user.courses[0].lessons;
      //
      this.doAll(this.currentId);
    }
  },
  components: {
    HeaderLearningComp,
  },
  created() {
    this.getLessons();
    this.getStatus();
  },
  mounted() {
    this.setHandler();
  }
};
</script>

<style scoped>
ul {
  cursor: pointer;
}
ul.active {
  background-color: rgb(240, 240, 240);
}
.bg-salmon {
  background-color: rgba(243, 119, 119, 0.514);
  cursor: not-allowed;
}
</style>
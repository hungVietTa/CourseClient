<template>
  <div>
    <HeaderLearningComp />
    <main>
      <youtube
        :video-id="
          lessons[currentId] ? lessons[currentId].video : lessons[0].video
        "
        ref="youtube"
        @playing="counter"
        @paused="reset"
        @ended="reset"
      ></youtube>
      <section class="list">
        <ul
          v-for="(lesson, index) in lessons"
          :key="lesson.id"
          @click="currentId = index"
          :class="{ active: index == currentId }"
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
      ],
      currentId: 0,
    };
  },
  computed: {},
  methods: {
    async getDuration() {
      await this.$refs.youtube.player
        .getDuration()
        .then((res) => (this.duration = res));
    },
    async times() {
      await this.$refs.youtube.player
        .getDuration()
        .then((res) => (this.time = res));
    },
    counter() {
      let el = this;
      this.intervalID = setInterval(function () {
        el.count += 3;
        console.log(el.count);
        if (
          el.lessonsStatus.filter(
            (item) => item.lesson_id == el.lessons[el.currentId].id)[0].count/el.duration >=0.9) {
          el.lessonsStatus.filter(
            (item) => item.lesson_id == el.lessons[el.currentId].id
          )[0].state = true;
          clearInterval(this.intervalID);
          let tmp = el.lessonsStatus.filter(
            (item) => item.lesson_id == el.lessons[el.currentId].id
          );
          tmp[0].count = el.count;
          el.axios.put(`http://localhost:3000/users/1`, el.user);
          return;
        }
      }, 3000);
    },
    reset() {
      if ( this.lessonsStatus.filter(
            (item) => item.lesson_id == el.lessons[el.currentId].id)[0].state == true)
        return
      let el = this;
      clearInterval(this.intervalID);
      let tmp = el.lessonsStatus.filter(
        (item) => item.lesson_id == el.lessons[el.currentId].id
      );
      tmp[0].count = el.count;
      this.axios.put(`http://localhost:3000/users/1`, el.user);
    },
    playing: function () {
      console.log(2);
    },
    getLessons: async function () {
      this.lessons = await this.axios
        .get("http://localhost:3000/lessons")
        .then((res) => res.data);
    },
    getUser: async function () {
      this.user = await this.axios
        .get("http://localhost:3000/users/1")
        .then((res) => res.data);
      this.lessonsStatus = this.user.courses[0].lessons;
      this.count = this.lessonsStatus.filter(
        (item) => item.lesson_id == this.lessons[this.currentId].id
      )[0].count;
      console.log(this.lessonsStatus);
    },
  },
  components: {
    HeaderLearningComp,
  },
  created() {
    this.getUser();
    this.getLessons();
  },
  mounted() {
    this.getDuration();
  },
};
</script>

<style scoped>
ul {
  cursor: pointer;
}
ul.active {
  background-color: rgb(240, 240, 240);
}
</style>
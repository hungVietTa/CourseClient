<template>
  <div>
    <HeaderLearningComp />
    <main>
        <h1>{{time}}</h1>
      <youtube
        :video-id="lessons[currentId]?lessons[currentId].video:lessons[0].video"
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
      count : 0,
      time:0,
      intervalID:2,
      test: false,
      lessons: [
        {
          id: 1,
          name: "Ruby - Part 1",
          des: "This is description",
          img: "https://i.ytimg.com/vi/4PLg-Oe3MfA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBuYdpe5BCIlLB4o68i8tiOgZIzcQ",
          video:
            "wkNR1hG4yOk",
          course_id: "1",
        },
      ],
      currentId: 0,
    };
  },
  methods: {
    async times(){
        await this.$refs.youtube.player.getDuration().then(res=>this.time=res)
    },
    counter(){
        let el = this
        this.intervalID = setInterval(function(){
            el.count+=1
            console.log(el.count)
        },1000)
    },
    reset(){
        console.log(this.count)
        clearInterval(this.intervalID)
        this.axios.put(`http://localhost:3000/usercourses/${this.currentId}`)
    },
    playing: function () {
      console.log(2)
    },
    getLessons: async function () {
      this.lessons = await this.axios
        .get("http://localhost:3000/lessons")
        .then((res) => res.data);
      console.log(this.player);
    },
  },
  components: {
    HeaderLearningComp,
  },
  created() {
    this.getLessons();
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
</style>
<template>
  <div>
    <main>
      <youtube
        :video-id="
          lesson.video
        "
      ></youtube>
      <div class="form-wrapper">
      <h4>Lesson {{lesson.id}} </h4>
      <p>{{lesson.title}}</p>
      <form  
        class="lesson-form"
        @submit.prevent="addLesson"
      >
        <label>Title: <input type="text" v-model="lesson.title" /></label>
        <label
          >Description: <input type="text" v-model="lesson.description"
        /></label>
        <label>Image: <input type="text" v-model="lesson.img" /></label>
        <label>Video: <input type="text" v-model="lesson.video" /></label>
        <label>Tag: <input type="text" v-model="lesson.tag" /></label>
        <label
          >Category: <input type="text" v-model="lesson.category"
        /></label>
        <button type="submit">Change</button>
        <button >Cancel</button>
      </form>
    </div>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {

      lesson: 
        {
        },
      currentId: 0,
    };
  },
  computed: {
  },
  methods: {
},
mounted(){
  this.lesson = 
        {
          id: 1,
          title: "Ruby - Part 1",
          description: "This is description",
          img: "https://i.ytimg.com/vi/4PLg-Oe3MfA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBuYdpe5BCIlLB4o68i8tiOgZIzcQ",
          video: "wkNR1hG4yOk",
          course_id: "1",
          tag:"framework",
          category:"backend"
        }
}
}
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
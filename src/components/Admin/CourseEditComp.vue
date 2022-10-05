<template>
  <div class="wrapper">
    <div class="form-wrapper">
      <h2>{{ course.name }}</h2>
      <form class="course-form" @submit.prevent="addCourse">
       <label class="w-100 mb-4"> <span >Name:</span> <input class="w-100" type="text" v-model="course.name" /></label>
     <div class="d-flex  mb-4">
        <label class="col-6">  <span >Publish:</span><input type="text" v-model="course.is_publish" /></label>
        <label class="col-6"><span >Date Published: </span><input type="text" v-model="course.published_at" /></label>
     </div>
     <div class="d-flex  mb-4">
         <label class="col-6"><span >Date Created: </span><input type="text" v-model="course.created_at" /></label>
        <label class="col-6"><span >Date Modified: </span><input type="text" v-model="course.updated_at" /></label><br>
     </div>
     <div class="d-flex mb-4">
      <label
          >Description: </label>
      <textarea type="text" rows="5" v-model="course.description"
        ></textarea>
     </div>
      </form>
    </div>
    <button @click="updateInfo">Update</button>
    <div class="text-start mb-2">
      <button @click="poolShow = !poolShow">Add new lesson</button>
      <button @click="poolShow = !poolShow">Save</button>
    </div>
    <div v-if="false" :class="{ shorten: poolShow }">
      <table>
        <tr>
          <th>ID</th>
          <th>Position</th>
          <th>Title</th>
          <th>Description</th>
          <th>Image</th>
          <th>Tag</th>
          <th>Category</th>
          <th>Move up</th>
          <th>Move down</th>
          <th>Delete</th>
        </tr>
        <tbody>
          <tr
            @keydown.prevent="keyPos($event, index)"
            v-for="(lesson, index) in lessons"
            :key="index"
            tabindex="0"
            class="lesson"
          >
            <td>{{ lesson.id }}</td>
            <td>{{ lesson.position }}</td>
            <td>{{ lesson.name }}</td>
            <td>{{ lesson.des }}</td>
            <td><img :src="lesson.img" alt="" /></td>
            <td>{{ lesson.tag }}</td>
            <td>{{ lesson.category }}</td>
            <td>
              <button @click="up($event.target, index)">Up</button>
            </td>
            <td><button @click="down($event.target, index)">Down</button></td>
            <td><button>Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="lessons-pool" v-if="poolShow">
      <ul>
        <li v-for="(lesson, index) in lessonsPool" :key="index">
          <img :src="lesson.img" alt="" />
          <p>ID: {{ lesson.id }}</p>
          <p>Name: {{ lesson.name }}</p>
          <button @click="addFromPool(index)">Add</button>
        </li>
      </ul>
    </div>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      poolShow: false,
      lessonsPool: [],
      course: {
      },
      currentIndex: 0,
      newLesson: {
        name: "",
        des: "",
        img: "",
        video: "",
        tag: "",
        category: "",
      },
      rawLessons: [],
    };
  },
  computed: {
    lessons() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.rawLessons.sort((a, b) => a.position - b.position);
    },
  },
  methods: {
    // LESSONS ARRANGEMENT
    keyPos(event, index) {
      if (event.keyCode == 38) {
        if (index == 0) return;
        let temp;
        temp = this.lessons[index].position;
        this.lessons[index].position = this.lessons[index - 1].position;
        this.lessons[index - 1].position = temp;
        event.target.previousElementSibling.focus();
      } else if (event.keyCode == 40) {
        event.target.focus();
        if (index == this.lessons.length - 1) return;
        let temp;
        temp = this.lessons[index].position;
        this.lessons[index].position = this.lessons[index + 1].position;
        this.lessons[index + 1].position = temp;
        event.target.nextElementSibling.focus();
      }
    },
    up(target, index) {
      target.parentNode.parentNode.focus();
      if (index == 0) return;
      let temp;
      temp = this.lessons[index].position;
      this.lessons[index].position = this.lessons[index - 1].position;
      this.lessons[index - 1].position = temp;
      target.parentNode.parentNode.previousElementSibling.focus();
    },
    down(target, index) {
      target.parentNode.parentNode.focus();
      if (index == this.lessons.length - 1) return;
      let temp;
      temp = this.lessons[index].position;
      this.lessons[index].position = this.lessons[index + 1].position;
      this.lessons[index + 1].position = temp;
      target.parentNode.parentNode.nextElementSibling.focus();
    },
    // LESSON POOL INTERACTION
    addFromPool(index) {
      this.lessonsPool[index].position =
        this.lessons[this.lessons.length - 1].position + 1;
      this.rawLessons.push(this.lessonsPool[index]);
    },
    // LESSON UNIT INTERACTION
    modifyAction(index) {
      this.courseFormShow = true;
      this.currentIndex = index;
      this.action = "Modify";
      this.newCourse = this.courses[this.currentIndex];
    },
    // CALL API
    fetching() {
      console.log(2)
      this.$store.dispatch("loadingFinishedFunc", false);
      let initialData = this.axios
        .get(`/api/v1/admin/courses/9`)
        .then((res) => {
          console.log(res.data);
          this.course = res.data;
          this.$store.dispatch("loadingFinishedFunc", true);
        })
        .catch((res) => {
          alert(res.response.data.error);
          this.$router.push("/");
        });
      return initialData;
    },
    add() {
      this.axios
        .post("/api/v1/admin/courses", this.newCourse)
        .then(() => {
          this.newCourse.name = "";
          this.newCourse.description = "";
          this.fetching();
        })
        .catch(() => {
          alert("something wrong happen !");
        });
    },
    updateInfo(){
      this.axios
        .put(`/api/v1/admin/courses/${this.course.id}`,this.course)
        .then(() => {
          console.log("Done")
          this.fetching();
        })
        .catch(() => {
          alert("something wrong happen !");
        });
    }
  },
  created(){
    // const getId = this.$route.params.id;
    // this.getId = this.$route.params.id;

    this.fetching()

  },
  mounted() {
    // for (let i = 0; i < 10; i++) {
    //   this.lessons.push({
    //     id: 100 + i,
    //     position: i + 1,
    //     name: "Default",
    //     des: "HTML CSS TAILWIND",
    //     img: "https://i.ytimg.com/vi/-VQhSM77_HA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLClX8lFY0T_TGnFgurbmgkujJO61w",
    //     tag: "framework",
    //     category: "frontEnd",
    //   });
    // }
    // for (let i = 0; i < 10; i++) {
    //   this.lessonsPool.push({
    //     id: 300 + i,
    //     name: "Pool",
    //     des: "HTML CSS TAILWIND",
    //     img: "https://i.ytimg.com/vi/jFfo23yIWac/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDsPN9vc9_VSLRbVrVcqZXxV4Ekig",
    //     tag: "framework",
    //     category: "frontEnd",
    //   });
    // }
    this.load = true;
  },
};
</script>
  <style scoped>
.wrapper {
  width: 1200px;
  margin: auto;
}
table {
  width: 1200px;
  margin: auto;
}
table td {
  height: 80px;
  position: relative;
}
table img {
  width: 80px;
  height: 40px;
  display: block;
  overflow: scroll;
}
table img:hover {
  position: absolute;
  width: 300px;
  height: 200px;
  top: 0;
  z-index: 2;
}
.lesson:focus {
  border: 1px solid #333;
}
.lessons-pool {
  position: fixed;
  bottom: 0;
  height: 300px;
  left: 0;
  right: 0;
  overflow-y: scroll;
  background-color: white;
}
.lessons-pool ul {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
.course-form {
  text-align: justify;
}
.shorten {
  height: 400px;
  overflow-y: scroll;
}
textarea {
  width: 100%;
}
label>span {
  display: inline-block;
  width: 150px;
}
</style>
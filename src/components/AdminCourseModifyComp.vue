<template>
  <div class="wrapper">
    <h1>Course {{ course.title }}</h1>
    <div class="form-wrapper">
      <p>{{ course.title }}</p>
      <form class="Course-form" @submit.prevent="addCourse">
        <label
          >title: <input type="text" v-model="course.title"
        /></label>
        <label
          >Desriptioncription: <input type="text" v-model="course.desription"
        /></label>
        <label
          >Image: <input type="text" v-model="course.img"
        /></label>
        <label
          >Video: <input type="text" v-model="course.video"
        /></label>
        <label
          >Tag: <input type="text" v-model="course.tag"
        /></label>
        <label
          >Category:
          <input type="text" v-model="course.category"
        /></label>
        <button type="submit">Change</button>
        <button >Cancel</button>
      </form>
    </div>
    <div class="text-start mb-2">
      <button @click="poolShow=!poolShow">Add new lesson</button>
      <button @click="poolShow=!poolShow">Save</button>
    </div>
    <div :class="{shorten:poolShow}">
      <table >
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
      <tbody >
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
      poolShow:false,
      lessonsPool: [],
      course: {
        title: "",
        desription: "",
        img: "",
        lessons:[],
        tag: "framework",
        category: "frontEnd",
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
    keyPos(event,index) {
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
    add() {},
    modify() {},
    delete() {},
    addFromPool(index) {
      this.lessonsPool[index].position =
        this.lessons[this.lessons.length - 1].position + 1;
      this.rawLessons.push(this.lessonsPool[index]);
    },
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.lessons.push({
        id: 100 + i,
        position: i + 1,
        name: "Default",
        des: "HTML CSS TAILWIND",
        img: "https://i.ytimg.com/vi/-VQhSM77_HA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLClX8lFY0T_TGnFgurbmgkujJO61w",
        tag: "framework",
        category: "frontEnd",
      });
    }
    for (let i = 0; i < 10; i++) {
      this.lessonsPool.push({
        id: 300 + i,
        name: "Pool",
        des: "HTML CSS TAILWIND",
        img: "https://i.ytimg.com/vi/jFfo23yIWac/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDsPN9vc9_VSLRbVrVcqZXxV4Ekig",
        tag: "framework",
        category: "frontEnd",
      });
    }

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
.form-wrapper {
  position: fixed;
  width: 200px;
  right: 0;
  top: 0;
  bottom: 0;
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
.shorten {
  height: 400px;
  overflow-y: scroll;
}
</style>
<template>
  <div class="wrapper">
    <div class="form-wrapper">
      <p>{{ schedule.title }}</p>
      <form class="Course-form" @submit.prevent="addCourse">
        <label
          >title: <input type="text" v-model="schedule.title"
        /></label>
        <label
          >Desriptioncription: <input type="text" v-model="schedule.desription"
        /></label>
        <label
          >Image: <input type="text" v-model="schedule.img"
        /></label>
        <label
          >Video: <input type="text" v-model="schedule.video"
        /></label>
        <label
          >Tag: <input type="text" v-model="schedule.tag"
        /></label>
        <label
          >Category:
          <input type="text" v-model="schedule.category"
        /></label>
        <button type="submit">Change</button>
        <button >Cancel</button>
      </form>
    </div>
    <div class="text-start mb-2">
      <button @click="poolShow=!poolShow">Add new course</button>
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
          v-for="(course, index) in courses"
          :key="index"
          tabindex="0"
          class="course"
        >
          <td>{{ course.id }}</td>
          <td>{{ course.position }}</td>
          <td>{{ course.name }}</td>
          <td>{{ course.des }}</td>
          <td><img :src="course.img" alt="" /></td>
          <td>{{ course.tag }}</td>
          <td>{{ course.category }}</td>
          <td>
            <button @click="up($event.target, index)">Up</button>
          </td>
          <td><button @click="down($event.target, index)">Down</button></td>
          <td><button>Delete</button></td>
        </tr>
      </tbody>
    </table>
    </div>
    <div class="courses-pool" v-if="poolShow">
      <ul>
        <li v-for="(course, index) in coursesPool" :key="index">
          <img :src="course.img" alt="" />
          <p>ID: {{ course.id }}</p>
          <p>Name: {{ course.name }}</p>
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
      coursesPool: [],
      schedule: {
        title: "",
        desription: "",
        img: "",
        courses:[],
        tag: "framework",
        category: "frontEnd",
      },
      currentIndex: 0,
      rawCourses: [],
    };
  },
  computed: {
    courses() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.rawCourses.sort((a, b) => a.position - b.position);
    },
  },
  methods: {
    keyPos(event,index) {
      if (event.keyCode == 38) {
        if (index == 0) return;
        let temp;
        temp = this.courses[index].position;
        this.courses[index].position = this.courses[index - 1].position;
        this.courses[index - 1].position = temp;
        event.target.previousElementSibling.focus(); 
      } else if (event.keyCode == 40) {
        event.target.focus();
        if (index == this.courses.length - 1) return;
        let temp;
        temp = this.courses[index].position;
        this.courses[index].position = this.courses[index + 1].position;
        this.courses[index + 1].position = temp;
        event.target.nextElementSibling.focus();
      }
    },
    up(target, index) {
      target.parentNode.parentNode.focus();
      if (index == 0) return;
      let temp;
      temp = this.courses[index].position;
      this.courses[index].position = this.courses[index - 1].position;
      this.courses[index - 1].position = temp;
      target.parentNode.parentNode.previousElementSibling.focus();
    },
    down(target, index) {
      target.parentNode.parentNode.focus();
      if (index == this.courses.length - 1) return;
      let temp;
      temp = this.courses[index].position;
      this.courses[index].position = this.courses[index + 1].position;
      this.courses[index + 1].position = temp;
      target.parentNode.parentNode.nextElementSibling.focus();
    },
    add() {},
    modify() {},
    delete() {},
    addFromPool(index) {
      this.coursesPool[index].position =
        this.courses[this.courses.length - 1].position + 1;
      this.rawCourses.push(this.coursesPool[index]);
    },
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.courses.push({
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
      this.coursesPool.push({
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
.course:focus {
  border: 1px solid #333;
}
.courses-pool {
  position: fixed;
  bottom: 0;
  height: 300px;
  left: 0;
  right: 0;
  overflow-y: scroll;
  background-color: white;
}
.courses-pool ul {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
.shorten {
  height: 400px;
  overflow-y: scroll;
}
</style>
<template>
  <main>
    <div v-for="(item, index) in news" :key="index" class="billboard">
      <h1>{{ item.title }}</h1>
      <h1>{{ item.id }}</h1>
      <p>{{ item.img }}</p>
      <p>
        {{ item.description }}
      </p>
      <button>Learn more</button>
    </div>
    <div class="courses">
      <section class="front-end">
        <h1>Schedule</h1>
        <div class="row">
          <div v-for="(item, index) in schedules" :key="index">
            <div class="course-card">
                <p>ID:{{item.id}}</p>
                <p>Title:{{item.title}}</p>
                <p>Des: {{item.description}}</p>
                <p>IMG: {{item.img}}</p>
                <p>SUBS: {{item.subscribes}}</p>
                <p>VIEWS: {{item.views}}</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h1>Course</h1>
        <div class="row">
          <div class="col-4" v-for="(item, index) in schedules" :key="index">
            <div class="course-card">
                <p>ID:{{item.id}}</p>
                <p>Title:{{item.title}}</p>
                <p>Des: {{item.description}}</p>
                <p>IMG: {{item.img}}</p>
                <p>SUBS: {{item.subscribes}}</p>
                <p>VIEWS: {{item.views}}</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h1>Tip and Trick</h1>
        <div class="row">
          <div class="col-4" v-for="(item, index) in tiptricks" :key="index">
            <div class="course-card">
                <p>ID:{{item.id}}</p>
                <p>Title:{{item.title}}</p>
                <p>Des: {{item.description}}</p>
                <p>IMG: {{item.img}}</p>
                <p>SUBS: {{item.subscribes}}</p>
                <p>VIEWS: {{item.views}}</p>
            </div>
          </div>
        </div>
      </section>
      <section class="bloga">
        <h1>Blog</h1>
        <div class="row">
          <div class="col-4" v-for="(item, index) in blogs" :key="index">
            <div class="course-card">
                <p>ID:{{item.id}}</p>
                <p>Title:{{item.title}}</p>
                <p>Des: {{item.description}}</p>
                <p>IMG: {{item.img}}</p>
                <p>{{item.user}}</p>
                <p>VIEWS: {{item.views}}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- <div class="blog">
        <div class="col-4">
          <div class="blog-card">
            <div class="author"></div>
            <img :src="course.img" alt="" />
            <div class="card-body">
              <h4></h4>
              <span>{{ course.price | moneyDelimit }} VND</span>
            </div>
            <div class="card-tag">
              <span class="badge"></span>
            </div>
          </div>
        </div>
      </div> -->
  </main>
</template>
<script>
export default {
  name: "HomeView",
  data() {
    return {
      news: [],
      schedules: [],
      courses: [],
      tiptricks: [],
      blogs: [],
    };
  },
  methods: {
    getCourses: async function () {
      this.courses = await this.axios
        .get("http://localhost:3000/courses")
        .then((res) => res.data);
    },
    getTip: async function () {
      this.tiptrick = await this.axios
        .get("http://localhost:3000/tiptrick")
        .then((res) => res.data);
    },
  },
  mounted() {
    // this.$refs.header.$el.querySelector("input").onclick = function () {
    //   console.log(2);
    // };
    for (let i = 0; i < 5; i++) {
      this.news.push({
        id: 315 + i,
        title: "new" + i,
        description: "content" + i,
      });
      this.schedules.push({
        id: 215 + i,
        title: "new" + i,
        img: "link",
        subscribes: 445,
        views: 464,
        description: "content" + i,
      });
      this.courses.push({
        id: 315 + i,
        title: "new" + i,
        img: "link",
        subscribes: 445,
        views: 464,
        description: "content" + i,

      });
      this.tiptricks.push({
        id: 215 + i,
        title: "new" + i,
        img: "link",
        views: 264,
        description: "content" + i,
      });
      this.blogs.push({
        id: 215 + i,
        title: "new" + i,
        img: "link",
        views: 264,
        user: 55,
        description: "content" + i,
      });
    }
  },
};
</script>
<style scoped>
    section div,.billboard{
        border: 1px solid #555;
        margin: 5px;
    }
</style>

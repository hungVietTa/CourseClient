<template>
  <div class="home">
    <HeaderComp />
    <main>
      <div class="billboard">
        <h1>Title</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus
          voluptas totam non, illum aspernatur aliquam?
        </p>
        <button>Learn more</button>
      </div>
      <div class="courses">
        <section class="front-end">
          <h1>Front-end</h1>
          <div class="row">
            <div class="col-4" v-for="course in courses.filter(course=>course.category=='front-end')" :key="course.id">
              <div class="course-card">
                <img :src="course.img" alt="" />
                <div class="card-info">
                  <h4>
                    <a href="#">{{ course.name }}</a>
                  </h4>
                  <span>{{ course.des }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="back-end">
          <h1>Back-end</h1>
          <div class="row">
            <div class="col-4" v-for="course in courses.filter(course=>course.category=='back-end')" :key="course.id">
              <div class="course-card">
                <img :src="course.img" alt="" />
                <div class="card-info">
                  <h4>
                    <a href="#">{{ course.name }}</a>
                  </h4>
                  <span>{{ course.des }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="tip-trick">
          <h1>Tips and Tricks</h1>
          <div class="row">
            <div class="col-4" v-for="tip in tiptrick" :key="tip.id">
              <div class="course-card">
                <img :src="tip.img" alt="" />
                <div class="card-info">
                  <h4>
                    <a href="#">{{ tip.name }}</a>
                  </h4>
                  <span>{{ tip.des }}</span>
                </div>
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
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderComp from "@/components/HeaderComp.vue";

export default {
  name: "HomeView",
  data(){
    return {
      courses:[],
      tiptrick:[]
    }
  },
  methods:{
      getCourses:async function(){
      this.courses =await this.axios.get("http://localhost:3000/courses").then(res=>res.data)
      console.log(this.courses)
    },
      getTip:async function(){
      this.tiptrick =await this.axios.get("http://localhost:3000/tiptrick").then(res=>res.data)
      console.log(this.courses)
    }
  },
  components: {
    HeaderComp,
  },
  mounted(){
    this.getCourses()
    this.getTip()
  }
};
</script>


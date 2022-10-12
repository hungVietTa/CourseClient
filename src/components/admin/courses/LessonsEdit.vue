<template>
  <div>
    <h2 class="fw-bold">Lesson#{{ course.id }}</h2>
    <!-- COURSES INFORMATION -->
    <div class="mb-4">
      <div class="form-normal">
        <div class="mb-3">
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/1qUZVz1Xh1o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <form class="Course-form" @submit.prevent="add">
          <label class="w-100">Name:</label>
          <input class="w-100 mb-3" type="text" />
          <label class="w-100">Video URL:</label>
          <input class="w-100 mb-3" type="text" />
          <label>Description: </label>
          <textarea class="mb-2" type="text" col="5" rows="5"></textarea>
          <div class="d-flex mb-4">
              <label class="col-6"
                ><span>Date Created: </span><input
                    class="text-center"
                  type="text"
                  disabled
                  :value="course.created_at.split('T')[0]"
              /></label>
              <label class="col-6"
                ><span>Date Modified: </span><input
                class="text-center"
                  type="text"
                  disabled
                  :value="course.updated_at.split('T')[0]" /></label
              ><br />
            </div>
            <button class="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
    <ModalComponent
      v-if="modalShow"
      @cancel="modalShow = false"
      @process="updateCourse(currentId)"
    />
  </div>
</template>
<script>
import ModalComponent from "@/components/others/ModalComponent.vue";

export default {
  data() {
    return {
      modalShow: false,
      img: "",
      FormShow: false,
      lessonsPool: [],
      course: {},
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
      load: false,
    };
  },
  computed: {
    lessons() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.rawLessons.sort((a, b) => a.position - b.position);
    },
  },
  methods: {
    // CALL API
    fetching() {
      // console.log(this.$route.params)
      // this.$store.dispatch("loadingFinishedFunc", false);
      let initialData = this.axios
        .get(`/api/v1/admin/courses/${this.$route.params.id}`)
        .then((res) => {
          this.course = res.data;
          this.load = true;
          console.log(res.data);
          // this.$store.dispatch("loadingFinishedFunc", true);
        })
        .catch((res) => {
          alert(res.response.data.error);
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
    updateInfo() {
      console.log(this.$refs.imgInput.files);
      let formData = new FormData();
      formData.append("name", this.course.name);
      formData.append("description", this.course.description);
      formData.append("is_publish", this.course.is_publish);
      if (this.$refs.imgInput.files[0])
        formData.append("cover_file", this.$refs.imgInput.files[0]);
      this.axios
        .put(`/api/v1/admin/courses/${this.course.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.$refs.imgInput.value = "";
          this.fetching();
        })
        .catch(() => {
          alert("something wrong happen !");
        });
    },
  },
  components: {
    ModalComponent,
  },
  created() {
    // const getId = this.$route.params.id;
    // this.getId = this.$route.params.id;

    this.fetching();
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.lessons.push({
        id: 100 + i,
        position: i + 1,
        name: "Configure VueJS Application Tutorials  " + (i + 1),
        des: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
        img: "https://i.ytimg.com/vi/-VQhSM77_HA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLClX8lFY0T_TGnFgurbmgkujJO61w",
        tag: "framework",
        category: "frontEnd",
      });
    }
    for (let i = 0; i < 10; i++) {
      this.lessonsPool.push({
        id: 300 + i,
        name: "Configure VueJS Application Tutorials " + (i + 1),
        des: "HTML CSS TAILWIND",
        img: "https://i.ytimg.com/vi/jFfo23yIWac/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDsPN9vc9_VSLRbVrVcqZXxV4Ekig",
        tag: "framework",
        category: "frontEnd",
      });
    }
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/admin_crud.scss";
.form-normal {
    width: 800px;
    margin: auto;
}
label {
    font-weight: bold;
}
</style>

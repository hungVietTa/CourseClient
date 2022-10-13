import axios from 'axios'

export default {
    namespaced:true,
    state:{
    },
    methods:{
        // READ
        fetching(context,[url,data]){
         axios
        .get(url)
        .then((res) => {
        data = res.data;
        })
        .catch(res => {
          alert(res.response.data.error);
        });
        },
        // CREATE
        // create(url,data) {
        //     this.axios
        //       .post("/api/v1/admin/courses", this.newCourse)
        //       .then(() => {
        //         this.newCourse.name = "";
        //         this.newCourse.description = "";
        //         this.fetching();
        //       })
        //       .catch(() => {
        //         alert("something wrong happen !");
        //       });
        // },
        // UPDATE
        // update() {
        //     console.log(this.$refs.imgInput.files);
        //     let formData = new FormData();
        //     formData.append("name", this.course.name);
        //     formData.append("description", this.course.description);
        //     formData.append("is_publish", this.course.is_publish);
        //     if (this.$refs.imgInput.files[0])
        //       formData.append("cover_file", this.$refs.imgInput.files[0]);
        //     this.axios
        //       .put(`/api/v1/admin/courses/${this.course.id}`, formData, {
        //         headers: {
        //           "Content-Type": "multipart/form-data",
        //         },
        //       })
        //       .then(() => {
        //         this.$refs.imgInput.value = "";
        //         this.fetching();
        //       })
        //       .catch(() => {
        //         alert("something wrong happen !");
        //       });
        //   },
        //   DELETE
        //   delete(id) {
        //     console.log(id)
        //     if (id)
        //       this.axios
        //         .delete(`/api/v1/admin/courses/${id}`, this.newCourse)
        //         .then(() => {
        //           this.fetching();
        //         })
        //         .catch(() => {
        //           alert("something wrong happen !");
        //         });
        //     },
        //   },
    }
}
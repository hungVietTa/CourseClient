<template>
    <div>
      <!-- MAIN CONTENT -->
      <main class="mt-4">
        <div
          class="
            text-start
            mb-3
            d-flex
            justify-content-between
            align-items-center
          "
        >
          <h4 class="fw-bold">Account Management</h4>
          <search-form @searching="search(value)"/>
          <div>
            <button class="btn btn-danger">Delete</button>
          </div>
        </div>
        <div class="table-wrapper">
          <table class="table">
          <thead>
            <tr>
              <!-- <th><input type="checkbox" /></th> -->
              <th class="text-nowrap" role="button" @click="sortById">ID  <span class="ms-2"><font-awesome-icon icon="fa-solid fa-sort" /></span></th>
              <th>Name </th>
              <th>Email</th>
              <th>Phone</th>
              <th>DoB</th>
              <th>Date Created <span></span></th>
              <th>Date Updated <span></span></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in pagiusers[page]" :key="index" routerLink="/admin/users/1">
              <!-- <td><input type="checkbox" /></td> -->
              <td>{{ user.id }}</td>
              <td>{{ user.name }} </td>
              <td>{{ user.email == null ? "No" : "Yes" }} </td>
              <td>{{ user.date_of_birtht.split('T')[0] }} </td>
              <td>{{ user.created_at.split("T")[0] }} </td>
              <td>{{ user.updated_at.split("T")[0] }} </td>
              <td>
                <button @click="modalShow=true;currentId=user.id" class="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        <nav aria-label="..." class="d-inline-block">
          <ul class="pagination">
            <li v-for="(item,index) in pagiusers" :key="index" class="page-item" :class="{active:index==page}"><a class="page-link" @click="page=index">{{index+1}}</a></li>
          </ul>
        </nav>
      </main>
      <ModalComponent v-if="modalShow" @cancel="modalShow=false" @process="deleteuser(currentId)"/>
    </div>
  </template>
  <script>
  import ModalComponent from "@/components/others/ModalComponent.vue"
  import SearchForm from "@/components/others/SearchForm.vue"
  
  export default {
    data() {
      return {
        modalShow:false,
        sortBy:"id",
        sortState:true,
        page: 0,
        apiusers: [],
        load: false,
        currentIndex: 0,
        currentId:0,
        newuser: {
          name: "",
          description: "",
        },
        FormShow: false,
        users: [],
      };
    },
    computed:{
      pagiusers(){
        let tmp = []
         for (let i = 0; i < this.users.length; i += 5) {
              tmp.push(this.users.slice(i, i + 5));
            }
        return tmp
      },
      // sortedusers(){
      //   return this.users.sort(function(a, b) {
      //     if ( this.sortBy.includes('date') )
      //       return a[this]
      //  });
      // }
  
    },
    methods: {
      fetching() {
        // this.$store.dispatch("loadingFinishedFunc", false);
        this.axios
          .get("/api/v1/admin/users")
          .then((res) => {
            console.log(res.data)
              this.users = res.data
          })
          .catch((res) => {
            alert(res.response.data.error);
            // this.$router.push("/");
          });
      },
      search(value){
        console.log(value)
      },
      sortById(){
  
      },
      add() {
        this.axios
          .post("/api/v1/admin/users", this.newuser)
          .then(() => {
            console.log(this.newuser);
            this.newuser.name = "";
            this.newuser.description = "";
            this.FormShow = false;
            this.fetching()
          })
          .catch(() => {
            alert("something wrong happen !");
          });
      },
      deleteuser(id) {
      console.log(id)
      if (id)
        this.axios
          .delete(`/api/v1/admin/users/${id}`, this.newuser)
          .then(() => {
            this.fetching();
          })
          .catch(() => {
            alert("something wrong happen !");
          });
      },
    },
    components:{
      ModalComponent,SearchForm
    },
    created() {
      this.fetching();
    },
    mounted() {
      this.load = true
      // let el=this
      // this.load = true
      // this.axios.get('http://localhost:4000/apiusers').then(res=>{
      //   let apiusers=res.data[0].items
      //   let i = 9
      //   let interval = setInterval(function(){
      //     el.axios.post('/api/v1/admin/users',{
      //         "name":apiusers[i].snippet.title,
      //         "description":apiusers[i].snippet.description
      //     }).then(()=>{i++;console.log(2)}).catch(res=>console.log(res))
      //   },2000)
      //   setTimeout(()=>{
      //     clearInterval(interval)
      //   },22000)
      // }).catch(res=>console.log(res))
    },
  };
  </script>
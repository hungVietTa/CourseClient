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
        <search-form @searching="search(value)" />
        <div>
          <button
            class="btn btn-primary me-2"
            @click="
              newFormShow = true;
              action = 'Add';
            "
          >
            Add new user
          </button>
          <button class="btn btn-danger">Delete</button>
        </div>
      </div>
      <!-- USER LIST START-->
      <div class="table-wrapper" v-if="data">
        <table class="table">
          <thead>
            <tr>
              <!-- <th><input type="checkbox" /></th> -->
              <th class="text-nowrap" role="button">
                ID
                <span class="ms-2"
                  ><font-awesome-icon icon="fa-solid fa-sort"
                /></span>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th colspan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in users"
              :key="index"
              @click="
                cardShow = true;
                currentUser = user;
              "
            >
              <!-- <td><input type="checkbox" /></td> -->
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{user.date_of_birth?user.date_of_birth.split("-").reverse().join("-"):'' }}</td>
              <td>
                <button
                  @click.stop="
                    updateFormShow = true;
                    currentUser = user;
                  "
                  class="btn btn-primary"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  @click.stop="
                    modalShow = true;
                    currentUser = user;
                  "
                  class="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- USER LIST END-->

      <!-- OVERLAY START-->
      <div class="overlay" v-if="newFormShow || updateFormShow || cardShow">
        <!--  USER CARD START-->
        <div class="form-popup" v-if="cardShow">
          <h3 class="fw-bold">User #{{ currentUser.id }}</h3>
          <form class="Course-form">
            <label class="w-100">Name:</label>
            <input
              class="w-100 mb-3 border-0"
              type="text"
              v-model="currentUser.name"
              disabled
            />
            <label class="w-100">Email</label>
            <input
              class="w-100 mb-3 border-0"
              type="text"
              v-model="currentUser.email"
              disabled
            />
            <label class="w-100">Date of birth:</label>
            <input
              class="w-100 mb-3 border-0"
              type="text"
              v-model="currentUser.date_of_birth"
              disabled
            />
            <div class="text-end">
              <button class="btn btn-secondary" @click="cardShow = false">
                Cancel
              </button>
            </div>
          </form>
        </div>
        <!-- NEW CARD END-->

        <!-- NEW USER FORM START-->
        <div class="form-popup" v-if="newFormShow">
          <h3 class="fw-bold">Add new user</h3>
          <form class="Course-form" @submit.prevent="createUser(newUser)">
            <label class="w-100">Name:</label>
            <input class="w-100 mb-3" type="text" v-model="newUser.name" />
            <label class="w-100">Email</label>
            <input class="w-100 mb-3" type="text" v-model="newUser.email" />
            <label class="w-100">Date of birth:</label>
            <input
              class="w-100 mb-3"
              type="text"
              v-model="newUser.date_of_birth"
            />
            <label class="w-100">Password:</label>
            <input
              class="w-100 mb-3"
              type="password"
              v-model="newUser.password"
            />
            <div class="text-end">
              <button class="btn btn-primary me-2" type="submit">Add</button>
              <button class="btn btn-secondary" @click="newFormShow = false">
                Cancel
              </button>
            </div>
          </form>
        </div>
        <!-- NEW USER FORM END-->

        <!-- UPDATE USER FORM START-->
        <div class="form-popup" v-if="updateFormShow">
          <h3 class="fw-bold">Update user #{{ currentUser.id }}</h3>
          <form class="Course-form" @submit.prevent="updateUser(currentUser)">
            <label class="w-100">Name:</label>
            <input class="w-100 mb-3" type="text" v-model="currentUser.name" />
            <label class="w-100">Date of birth:</label>
            <input
              class="w-100 mb-3"
              type="text"
              v-model="currentUser.date_of_birth"
            />
            <div class="text-end">
              <button class="btn btn-primary me-2" type="submit">Update</button>
              <button class="btn btn-secondary" @click="updateFormShow = false">
                Cancel
              </button>
            </div>
          </form>
        </div>
        <!-- UPDATE USER FORM END-->
      </div>
      <!-- OVERLAY END-->

      <!-- PAGINATION START -->
      <div class="vue-pagination mb-4" v-if="data&&meta.pages>1">
        <paginate v-model="currentPage" :pageCount="meta.pages" :click-handler="userPaging"/>
      </div>
      <!-- PAGINATION END -->
    </main>
    <!-- MODAL DELETE-->
    <ModalComponent
      v-if="modalShow"
      @cancel="modalShow = false"
      @process="deleteUser(currentUser.id)"
    />
    <!-- MODAL DELETE-->
  </div>
</template>
  <script>
import ModalComponent from "@/components/others/ModalComponent.vue";
import SearchForm from "@/components/others/SearchForm.vue";
import API from "@/api/admin/users/index";
import formHandling from "@/mixin/formHandling";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      // DATA
      data: {},
      meta: {},
      users: false,
      // modal
      modalShow: false,
      // pagination
      currentPage: 1,
      usersCount: false,
      remainsCount: false,
      // courses list
      currentUser: false,
      currentId: 0,
      // show user
      user: false,
      // new user
      newUser: {
        name: "",
        email: "",
        date_of_birth: "",
        password: "",
      },
      //  user card
      cardShow: false,
      // new form
      newFormShow: false,
      // update form
      updateFormShow: false,
    };
  },
  methods: {
    // STORE
    ...mapActions("alert", ["showSuccess"]),
    // API CALL
    // get user list
    async getUsers(page) {
      this.data = await API.getUsers(page);
      this.users = this.data.users;
      this.meta = this.data.meta;
      this.currentPage = page;
      this.usersCount = this.users.length;
      console.log(this.users)
    },
    // create user
    async createUser(data) {
      await API.createUser(data);
      this.clearForm(this.newUser);
      this.newFormShow = false;
      this.showSuccess();
      this.getUsers(1);
    },
    // update user
    async updateUser(data) {
      await API.updateUser(data);
      this.updateFormShow = false;
      this.showSuccess();
      this.getUsers(this.currentPage);
    },
    // delete user
    async deleteUser(id) {
      await API.deleteUser(id);
      this.showSuccess();
      if (this.usersCount == 1) this.getUsers(this.currentPage - 1);
      else this.getUsers(this.currentPage);
    },
    // clickPagin
    userPaging(page){
      this.getUsers(page)
    },
    search(value) {
      console.log(value);
    },
  },
  components: {
    ModalComponent,
    SearchForm,
  },
  mixins: [formHandling],
  created() {
    this.getUsers(1);
  },
  mounted() {
    this.load = true;
  },
};
</script>
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
        <h4 class="fw-bold">Categories Management</h4>
        <search-form @searching="search(value)" />
        <div>
          <button
            class="btn btn-primary me-2"
            @click="
              newFormShow = true;
              action = 'Add';
            "
          >
            Add new category
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

              <th colspan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(category, index) in categories"
              :key="index"
              @click="
                cardShow = true;
                currentCategory = category;
              "
            >
              <!-- <td><input type="checkbox" /></td> -->
              <td>{{ category.id }}</td>
              <td>{{ category.name }}</td>
              <td>
                <button
                  @click.stop="
                    updateFormShow = true;
                    currentCategory = category;
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
                    currentCategory = category;
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
          <h3 class="fw-bold">Category #{{ currentCategory.id }}</h3>
          <form class="Course-form">
            <label class="w-100">Name:</label>
            <input
              class="w-100 mb-3 border-0"
              type="text"
              v-model="currentCategory.name"
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
          <h3 class="fw-bold">Add new category</h3>
          <form class="Course-form" @submit.prevent="createCategory(newCategory)">
            <label class="w-100">Name:</label>
            <input class="w-100 mb-3" type="text" v-model="newCategory.name" />
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
          <h3 class="fw-bold">Update category #{{ currentCategory.id }}</h3>
          <form class="Course-form" @submit.prevent="updateCategory(currentCategory)">
            <label class="w-100">Name:</label>
            <input class="w-100 mb-3" type="text" v-model="currentCategory.name" />
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
        <paginate v-model="currentPage" :pageCount="meta.pages" :click-handler="categoryPaging"/>
      </div>
      <!-- PAGINATION END -->
    </main>
    <!-- MODAL DELETE-->
    <ModalComponent
      v-if="modalShow"
      @cancel="modalShow = false"
      @process="deleteCategory(currentCategory.id)"
    />
    <!-- MODAL DELETE-->
  </div>
</template>
  <script>
import ModalComponent from "@/components/others/ModalComponent.vue";
import SearchForm from "@/components/others/SearchForm.vue";
import API from "@/api/admin/categories/index";
import formHandling from "@/mixin/formHandling";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      // DATA
      limit:5,
      data: {},
      meta: {},
      categories: false,
      // modal
      modalShow: false,
      // pagination
      currentPage: 1,
      categoriesCount: false,
      remainsCount: false,
      // courses list
      currentCategory: false,
      currentId: 0,
      // show category
      category: false,
      // new category
      newCategory: {
        name: "",
        email: "",
        date_of_birth: "",
        password: "",
      },
      //  category card
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
    // get category list
    async getCategories(page) {
      this.data = await API.getCategories(this.limit,page);
      this.categories = this.data.categories;
      this.meta = this.data.meta;
      this.currentPage = page;
      this.categoriesCount = this.categories.length;
      console.log(this.categories)
    },
    // create category
    async createCategory(data) {
      await API.createCategory(data);
      this.clearForm(this.newCategory);
      this.newFormShow = false;
      this.showSuccess();
      this.getCategories(1);
    },
    // update category
    async updateCategory(data) {
      await API.updateCategory(data);
      this.updateFormShow = false;
      this.showSuccess();
      this.getCategories(this.currentPage);
    },
    // delete category
    async deleteCategory(id) {
      await API.deleteCategory(id);
      this.showSuccess();
      if (this.categoriesCount == 1) this.getCategories(this.currentPage - 1);
      else this.getCategories(this.currentPage);
    },
    // clickPagin
    categoryPaging(page){
      this.getCategories(page)
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
    this.getCategories(1);
  },
  mounted() {

  },
};
</script>
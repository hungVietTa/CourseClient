<template>
  <div class="user-profile px-4 mt-4">
    <h2 class="mb-5">
      User#{{ user.id }}
      <button
        @click="
          modalShow = true;
          currentId = user.id;
        "
        class="btn btn-danger ms-5"
      >
        Delete
      </button>
    </h2>
    <div class="row">
      <div class="col-xl-4">
        <!-- Profile picture card-->
        <div class="card mb-4 mb-xl-0">
          <div class="card-header fw-bold">Ảnh đại diện</div>
          <div class="card-body text-center">
            <!-- Profile picture image-->
            <img
              class="img-account-profile rounded-circle mb-2"
              src="https://image.thanhnien.vn/1200x630/Uploaded/2022/keqi/upload/image/article/2016/11/15/c19b127dd14d146424cd65e51c76b92e.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="col-xl-8">
        <!-- Account details card-->
        <div class="card mb-4">
          <div class="card-header fw-bold">Thông tin cá nhân</div>
          <div class="card-body">
            <form>
              <div class="row gx-3 mb-3">
                <!-- Form Group (first name)-->
                <div class="col-md-6">
                  <label class="small mb-1" for="inputFirstName">Name:</label>
                  <input
                    class="form-control"
                    id="inputFirstName"
                    :value="user.name"
                    type="text"
                    disabled
                  />
                </div>
              </div>
              <div class="mb-3">
                <label class="small mb-1" for="inputEmailAddress"
                  >Email address</label
                >
                <input
                  class="form-control"
                  id="inputEmailAddress"
                  type="email"
                  :value="user.email"
                  disabled
                />
              </div>
              <!-- Form Row-->
              <div class="row gx-3 mb-3">
                <!-- Form Group (phone number)-->
                <div class="col-md-6">
                  <label class="small mb-1" for="inputPhone"
                    >Phone number</label
                  >
                  <input
                    class="form-control"
                    id="inputPhone"
                    type="tel"
                    :value="user.phone"
                    disabled
                  />
                </div>
                <!-- Form Group (birthday)-->
                <div class="col-md-6">
                  <label class="small mb-1" for="inputBirthday">Birthday</label>
                  <input
                    class="form-control"
                    id="inputBirthday"
                    type="text"
                    name="birthday"
                    :value="user.date_of_birth"
                    disabled
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <ModalComponent v-if="modalShow" @cancel="modalShow=false" @process="deleteuser(currentId)"/>
  </div>
</template>
<script>
import ModalComponent from "@/components/others/ModalComponent.vue"

export default {
  name: "UserProfileComp",
  data() {
    return {
      user: {},
      modalShow:false
    };
  },
  mounted() {
    this.user = {
      name: "Hung",
      email: "nidalaee@yasuo.com",
      phone: "097231345",
      birthday: "01-02-1996",
    };
  },
  methods: {
    fetching() {
      this.axios
        .get("/api/v1/admin/users")
        .then((res) => {
          console.log(res.data);
          this.users = res.data;
        })
        .catch((res) => {
          alert(res.response.data.error);
        });
    },
    deleteuser(id) {
      console.log(id);
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
    ModalComponent
  }
};
</script>
<style lang="scss">
.user-profile {
  .img-account-profile {
    width: 150px;
    height: 150px;
  }

  .rounded-circle {
    border-radius: 50% !important;
  }

  .card {
    box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);
  }

  .card .card-header {
    font-weight: 500;
  }

  .card-header:first-child {
    border-radius: 0.35rem 0.35rem 0 0;
  }

  .card-header {
    padding: 1rem 1.35rem;
    margin-bottom: 0;
    background-color: rgba(33, 40, 50, 0.03);
    border-bottom: 1px solid rgba(33, 40, 50, 0.125);
  }

  .form-control,
  .dataTable-input {
    display: block;
    width: 100%;
    padding: 0.875rem 1.125rem;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1;
    color: #69707a;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #c5ccd6;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.35rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .nav-borders .nav-link.active {
    color: #0061f2;
    border-bottom-color: #0061f2;
  }

  .nav-borders .nav-link {
    color: #69707a;
    border-bottom-width: 0.125rem;
    border-bottom-style: solid;
    border-bottom-color: transparent;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0;
    padding-right: 0;
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>

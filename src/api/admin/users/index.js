import axios from "axios";

export default {
  courses:1,
  // GET ALL COURSES
  
  // GET CATEGORIES
  async getUsers(){
    return await axios
      .get(`api/v1/admin/users?limit=10&page=1`)
      .then(res => res.data)
      .catch((res) => console.log(res));
  },
  async deleteUser() {
    await axios
      .get(`api/v1/admin/users/3`)
      .then(() => false)
      .catch((res) => console.log(res));
  },

};

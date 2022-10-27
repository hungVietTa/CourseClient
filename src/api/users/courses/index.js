import axios from "axios";

export default {
// GET SPECIFIC COURSE
  async showCourse(id){
    return await axios
      .get(`api/v1/users/courses/${id}`)
      .then(res => res.data)
      .catch((res) => console.log(res));
  },
}
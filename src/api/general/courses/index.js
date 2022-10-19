import axios from "axios";

export default {
  courses:1,
  // GET COURSES LIST
  async getCoursesList(id){
    return await axios
    .get(`http://localhost:4000/courses${id}`)
    .then(res => res.data)
    .catch((res) => console.log(res));
  },
  // GET CATEGORIES
  async getCategories(){
    return await axios
      .get(`http://localhost:4000/categories`)
      .then(res => res.data)
      .catch((res) => console.log(res));
  },
  // GET SPECIFIC COURSE
  getCourse(){
    axios
      .get(`http://localhost:4000/courses`)
      .then(() => false)
      .catch((res) => console.log(res));
  },
  // Lessons
  async getLessons() {
    return await axios
      .get(`http://localhost:4000/lessons`)
      .then(res => res.data)
      .catch((res) => console.log(res));
  },
  async updateLesson(data,id){
    await axios
      .put(`http://localhost:4000/lessons/${id}`, data)
      .then(() => false)
      .catch((res) => console.log(res));
  },
  // Reviews
  async getReviews() {
    return await axios
      .get(`http://localhost:4000/reviews`)
      .then(res => res.data)
      .catch((res) => console.log(res));
  },
  async postReview(data) {
    console.log(data);
    axios
      .post(`http://localhost:4000/reviews`, data)
      .then(() => false)
      .catch((res) => console.log(res));
  },
  // YourReviews
  async getYourReview() {
    return await axios
      .get(`http://localhost:4000/reviews/11`)
      .then(res => res.data)
      .catch((res) => console.log(res));
  },
  async updateReview(data, id) {
    await axios
      .put(`http://localhost:4000/reviews/${id}`, data)
      .then(() => false)
      .catch((res) => console.log(res));
  },
  deleteReview() {
    axios
      .get(`http://localhost:4000/lessons`)
      .then(() => false)
      .catch((res) => console.log(res));
  },
  // Get rating stats
  async getStats() {
    return await axios
      .get(`http://localhost:4000/stats`)
      .then(res => res.data)
      .catch((res) => console.log(res));
  },
};

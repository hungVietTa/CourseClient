import axios from "axios";

export default {
  // GET CATEGORIES
  async getCategories(){
    return await axios
      .get(`http://localhost:4000/categories`)
      .then(res => res.data)
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
      .get(`http://localhost:4000/yourReview`)
      .then(res => res.data)
      .catch((res) => console.log(res));
  },
  async updateReview(data, id) {
    await axios
      .put(`http://localhost:4000/yourReview`, data)
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

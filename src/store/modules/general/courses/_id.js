import axios from "axios";

export default {
  namespaced: true,
  state: {
    coursesData: false,
    lessonsData:false
  },
  mutations: {
    setCourses(state, data) {
      state.coursesData = data;
    },
    setLessons(state, data) {
        state.lessonsData = data;
      },
  },
  actions: {
    // Billboards
    getCourses({ commit}) {
      axios
        .get(`http://localhost:4000/billboards`)
        .then((res) => commit("setBillboards", res.data))
        .catch((res) => console.log(res));
    },
    // Courses
    getLessons({ commit}) {
        axios
          .get(`http://localhost:4000/lessons`)
          .then((res) => commit("setLessons", res.data))
          .catch((res) => console.log(res));
      }
  },
};

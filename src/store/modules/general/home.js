import axios from "axios";

export default {
  namespaced: true,
  state: {
    billboardsData: false,
    coursesData:false
  },
  mutations: {
    setBillboards(state, data) {
      state.billboardsData = data;
    },
    setCourses(state, data) {
        state.coursesData = data;
      },
  },
  actions: {
    // Billboards
    getBillboards({ commit}) {
      axios
        .get(`http://localhost:4000/billboards`)
        .then((res) => commit("setBillboards", res.data))
        .catch((res) => console.log(res));
    },
    // Courses
    getCourses({ commit}) {
        axios
          .get(`/api/v1/admin/courses/`)
          .then((res) => commit("setCourses", res.data))
          .catch((res) => console.log(res));
      }
  },
};

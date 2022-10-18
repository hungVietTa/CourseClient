export default {
  namespaced: true,
  state: {
    successAlert:false
  },
  mutations: {
    toggleSuccess(state) {
      state.successAlert =  !state.successAlert;
    }
  },
  actions: {
    showSuccess({ commit}) {
        commit('toggleSuccess')
        setTimeout(function(){
            commit('toggleSuccess')
        },1000)
      }
  },
};

const state = {

    state: {
        showSidebar: "abc",
        test: "asdf"
    }};
    const mutations = {
        showSidebar(state, value) {
            state.state.showSidebar = value
        },
        teee(state, value) {
            state.state.test = value
        }
    };
    const actions = {
        toggleSidebar({ commit }) {
            console.log('test')
            commit("showSidebar", "asdfgh")
        },
        ttt({ commit }) {
            console.log('test')
            commit("teee", "asdfgh")
        }
    }



export default {
    namespaced: true,
    state,
    // getters,
    mutations,
    actions

}



export default {
  namespaced: true,
  state: () => ({
    showSidebar: false,
  }),
  mutations: {
    hideSidebar(state) {
      state.showSidebar = false;
    },
    displaySidebar(state) {
      state.showSidebar = true;
    },
  },
  actions: {
    async hideSidebar({ commit }) {
      commit("hideSidebar");
    },
    async displaySidebar({ commit }) {
      commit("displaySidebar");
    },
  },
};

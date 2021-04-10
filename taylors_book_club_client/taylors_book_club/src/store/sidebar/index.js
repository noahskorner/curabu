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
    async hideSidebar(context) {
      context.commit("hideSidebar");
    },
    async displaySidebar(context) {
      context.commit("displaySidebar");
    },
  },
  getters: {
    getShowSidebar(state) {
      return state.showSidebar;
    },
  },
};

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
    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
  },
  actions: {
    async hideSidebar(context) {
      context.commit("hideSidebar");
    },
    async displaySidebar(context) {
      context.commit("displaySidebar");
    },
    async toggleSidebar(context) {
      context.commit("toggleSidebar");
    },
  },
  getters: {
    getShowSidebar(state) {
      return state.showSidebar;
    },
  },
};

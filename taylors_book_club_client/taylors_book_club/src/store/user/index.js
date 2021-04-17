import API from "../../services/API.js";

export default {
  namespaced: true,
  state: () => ({
    user: {},
  }),
  mutations: {
    login() {
      console.log("User logged in baby");
    },
  },
  actions: {
    async login(context, payload) {
      const data = await API.login(payload);
      console.log(data);
      context.commit("login");
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
};

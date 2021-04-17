import router from "../../router/index.js";
import API from "../../services/API.js";
export default {
  namespaced: true,
  state: () => ({
    user: {},
  }),
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async login({ dispatch }, token) {
      localStorage.setItem("Authorization", `Token ${token}`);
      await dispatch("loadUser");
      router.push("/");
    },
    async logout() {
      localStorage.removeItem("Authorization");
      localStorage.removeItem("user");
    },
    async loadUser({ dispatch }) {
      try {
        if (localStorage.Authorization) {
          const response = await API.getUser({
            Authorization: localStorage.Authorization,
          });
          await dispatch("setUser", response.data);
        }
      } catch (error) {
        if (error.response) {
          console.log(error);
        } else if (error.request) {
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async setUser({ commit }, user) {
      localStorage.user = JSON.stringify(user);
      commit("setUser", user);
    },
  },
};

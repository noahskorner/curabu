import router from "../../router/index.js";
import API from "../../services/API.js";
export default {
  namespaced: true,
  state: () => ({
    user: {},
    isAuthenticated: true,
  }),
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
      console.log(state.isAuthenticated);
    },
  },
  actions: {
    async login({ dispatch, commit }, token) {
      localStorage.setItem("Authorization", `Token ${token}`);
      await dispatch("loadUser");
      commit("setIsAuthenticated", true);
      router.push("/");
    },
    async logout({ commit }) {
      localStorage.removeItem("Authorization");
      localStorage.removeItem("user");
      commit("setUser", {});
      commit("setIsAuthenticated", false);
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
    async setIsAuthenticated({ commit }, isAuthenticated) {
      commit("setUser", isAuthenticated);
    },
  },
};

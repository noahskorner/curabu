import { createStore } from "vuex";
import sidebarModule from "./sidebar";
import userModule from "./user";

export default createStore({
  modules: {
    sidebar: sidebarModule,
    user: userModule,
  },
  state: {
    theme: "/themes/light-theme.css",
  },
  mutations: {
    setTheme(state, newTheme) {
      switch (newTheme) {
        case "light":
          state.theme = "/themes/light-theme.css";
          break;
        case "dark":
          state.theme = "/themes/dark-theme.css";
          break;
        default:
          state.theme = "/themes/light-theme.css";
          break;
      }
    },
  },
  actions: {
    async setTheme({ commit }, newTheme) {
      commit("setTheme", newTheme);
    },
    async toggleTheme({ dispatch, state }) {
      if (state.theme.includes("light")) dispatch("setTheme", "dark");
      else dispatch("setTheme", "light");
    },
  },
});

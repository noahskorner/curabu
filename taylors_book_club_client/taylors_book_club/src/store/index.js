import { createStore } from "vuex";
import sidebarModule from "./sidebar";
import userModule from "./user";
import alertModule from "./alert";

export default createStore({
  modules: {
    sidebar: sidebarModule,
    user: userModule,
    alert: alertModule,
  },
  state: {
    theme: "/themes/light-theme.css",
  },
  mutations: {
    setTheme(state, newTheme) {
      switch (newTheme) {
        case "light":
          state.theme = "/themes/light-theme.css";
          localStorage.setItem("theme", "light");
          break;
        case "dark":
          state.theme = "/themes/dark-theme.css";
          localStorage.setItem("theme", "dark");
          break;
        default:
          state.theme = "/themes/light-theme.css";
          localStorage.setItem("theme", "light");
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

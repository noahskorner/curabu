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
  getters: {
    getTheme(state) {
      return state.theme;
    },
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
    async setTheme(context, newTheme) {
      context.commit("setTheme", newTheme);
    },
  },
});

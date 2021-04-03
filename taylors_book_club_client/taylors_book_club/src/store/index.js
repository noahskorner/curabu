import { createStore } from "vuex";
import sidebarModule from "./sidebar";

export default createStore({
  modules: {
    sidebar: sidebarModule,
  },
  state: {
    theme: "",
  },
  getters: {},
  mutations: {},
  actions: {},
});

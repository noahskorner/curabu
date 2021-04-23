import { v4 as uuidv4 } from "uuid";

export default {
  namespaced: true,
  state: () => ({
    alerts: [],
  }),
  mutations: {
    addAlert(state, newAlert) {
      newAlert.id = uuidv4();
      state.alerts.push(newAlert);
    },
    dismissAlert(state, index) {
      state.alerts.splice(index, 1);
    },
  },
  actions: {
    async addAlert({ commit }, newAlert) {
      commit("addAlert", newAlert);
    },

    async dismissAlert({ commit }, index) {
      commit("dismissAlert", index);
    },
  },
};

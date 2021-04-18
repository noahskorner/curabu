export default {
  namespaced: true,
  state: () => ({
    alerts: [],
  }),
  mutations: {
    addAlert(state, newAlert) {
      state.alerts.unshift(newAlert);
    },
    dismissAlert(state, index) {
      state.alerts[index].dismissed = true;
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

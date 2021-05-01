import API from "../../services/API.js";

export default {
  namespaced: true,
  state: () => ({
    clubs: [],
  }),
  getters: {
    getClubs(state) {
      return state.clubs;
    },
    getCurrentBook: (state) => (id) => {
      return state.clubs.find((club) => club.id === id).current_book;
    },
  },
  mutations: {
    setClubs(state, clubs) {
      state.clubs = clubs;
    },
  },
  actions: {
    async loadClubs({ commit }) {
      let clubs = [];
      try {
        const response = await API.getClubs();
        clubs = response.data;
      } catch (error) {
        console.log("Error trying to get clubs.", error);
      }
      commit("setClubs", clubs);
    },
  },
};

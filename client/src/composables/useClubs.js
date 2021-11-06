import { reactive, toRefs } from "vue";
import router from "../router";
import API from "../services/api";

const state = reactive({
  clubs: [],
});

const setClubs = (clubs) => {
  state.clubs = clubs;
};

const loadClubs = async () => {
  try {
    const response = await API.getClubs();
    const clubs = response.data.data;
    setClubs(clubs);
  } catch (error) {
    console.log(error);
  }
};

const loadClub = async (clubId) => {
  try {
    const response = await API.getClub(clubId);
    const club = response.data.data;
    return club;
  } catch (error) {
    console.log(error);
    router.push({ name: "clubs" });
  }
};

export default () => {
  return {
    ...toRefs(state),
    loadClubs,
    loadClub,
  };
};

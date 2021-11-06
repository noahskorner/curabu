import { ref } from "vue";
import API from "../services/api";

const clubs = ref([]);

const setClubs = (newClubs) => {
  clubs.value = newClubs;
};

const loadClubs = async () => {
  try {
    const response = await API.getClubs();
    setClubs(response.data);
  } catch (error) {
    console.log(error);
  }
};

return {
  clubs,
  loadClubs,
};

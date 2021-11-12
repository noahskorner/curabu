import { reactive, toRefs } from "vue";
import router from "../router";
import API from "../services/api";
import useAuth from "./useAuth";

const { accessToken } = useAuth();

const state = reactive({
  clubs: [],
  currentClub: null,
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
    state.currentClub = response.data.data;
  } catch (error) {
    console.log(error);
    router.push({ name: "clubs" });
  }
};

const addPost = async (post) => {
  try {
    const response = await API.postPost(accessToken.value, post);
    state.currentClub.posts.push(response.data.data);
  } catch (error) {
    console.log(error.response);
  }
};

const addClubBook = (book) => {
  console.log(state.currentClub);
  state.currentClub.bookClub.books.push(book);
};

export default () => {
  return {
    ...toRefs(state),
    loadClubs,
    loadClub,
    addPost,
    addClubBook,
  };
};

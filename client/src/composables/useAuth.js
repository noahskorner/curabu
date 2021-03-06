import API from "../services/api";
import useAlert from "./useAlerts";
import jwt_decode from "jwt-decode";
import { reactive, toRefs } from "vue";
import router from "../router";

const { alertTypes, addAlert } = useAlert();

const state = reactive({
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
  userId: "",
  username: "",
  email: "",
  roles: [],
});

const setAccessToken = (accessToken) => {
  const { email, exp, id, username, roles } = jwt_decode(accessToken);

  state.isAuthenticated = true;
  state.accessToken = accessToken;
  state.userId = id;
  state.username = username;
  state.email = email;
  state.roles = roles;

  // setup silent refresh for when access token expires
  const msExpiration = Math.abs(new Date() - new Date(exp * 1000)) - 15;
  setTimeout(refreshAccessToken, msExpiration);
};

const setRefreshToken = (refreshToken) => {
  state.refreshToken = refreshToken;
  localStorage.setItem("refreshToken", refreshToken);
};

const refreshAccessToken = async () => {
  try {
    const payload = {
      token: state.refreshToken,
    };
    const response = await API.refreshToken(payload);

    const { accessToken, refreshToken } = response.data.data;

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  } catch (error) {
    state.isAuthenticated = false;
    router.push({ name: "login" });
  }
};

const loadAuth = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (refreshToken) {
    state.refreshToken = refreshToken;
    await refreshAccessToken();
  }
};

const logout = async () => {
  try {
    await API.logout(state.accessToken);
  } catch (error) {
    console.log(error);
  }

  localStorage.removeItem("refreshToken");
  router.push({ name: "login" });
  state.isAuthenticated = false;

  addAlert({
    message: "Succesfully logged out!",
    type: alertTypes.success,
  });
};

export default () => {
  return {
    ...toRefs(state),
    setAccessToken,
    setRefreshToken,
    loadAuth,
    logout,
  };
};

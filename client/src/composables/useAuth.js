import API from "../services/api";
import jwt_decode from "jwt-decode";
import { reactive, toRefs } from "vue";
import router from "../router";

const state = reactive({
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
  userId: "",
  email: "",
  roles: [],
});

const setAccessToken = (accessToken) => {
  const { email, exp, id, roles } = jwt_decode(accessToken);

  state.isAuthenticated = true;
  state.accessToken = accessToken;
  state.userId = id;
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
  localStorage.removeItem("refreshToken");
  state.isAuthenticated = false;
  try {
    await API.logout(state.accessToken);
  } catch (error) {
    console.log(error);
  }

  router.push({ name: "login" });
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

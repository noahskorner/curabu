import axios from "axios";

const baseURL = "http://localhost:3001/";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  login(payload) {
    return apiClient.post("auth/login", payload);
  },
  register(payload) {
    return apiClient.post("auth/register", payload);
  },
  refreshToken(payload) {
    return apiClient.post("auth/refresh-token", payload);
  },
  logout(accessToken) {
    return apiClient.delete("auth/logout", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

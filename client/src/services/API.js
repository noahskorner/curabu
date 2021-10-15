import axios from "axios";

const baseURL = "http://localhost:8000/";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  register(payload) {
    return apiClient.post("rest-auth/registration/", payload);
  },
  verifyEmail(payload) {
    return apiClient.post("rest-auth/registration/verify-email/", payload);
  },
  login(payload) {
    return apiClient.post("rest-auth/login/", payload);
  },
  getUser(auth) {
    return apiClient.get("rest-auth/user/", { headers: auth });
  },
  changePassword(payload, auth) {
    return apiClient.post("rest-auth/password/change", payload, {
      headers: auth,
    });
  },
  getClubs() {
    return apiClient.get("api/clubs/");
  },
};
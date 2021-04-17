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
  login(payload) {
    return apiClient.post("rest-auth/login/", payload);
  },
  getUser(auth) {
    return apiClient.get("rest-auth/user/", { headers: auth });
  },
};

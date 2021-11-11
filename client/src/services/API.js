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
  getClubs() {
    return apiClient.get("clubs");
  },
  getClub(clubId) {
    return apiClient.get(`clubs/${clubId}`);
  },
  postPost(accessToken, payload) {
    return apiClient.post("clubs/posts", payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  searchBooks(accessToken, query) {
    return apiClient.get(`books/search?q=${query.replace(" ", "+")}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

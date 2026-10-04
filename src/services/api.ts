import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("accessToken");

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  } else {
    config.headers.delete("Authorization");
  }

  return config;
});

export default api;

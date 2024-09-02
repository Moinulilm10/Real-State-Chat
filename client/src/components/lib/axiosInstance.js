import axios from "axios";

const url = import.meta.env.VITE_SERVER_BASE_URL;
const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default api;

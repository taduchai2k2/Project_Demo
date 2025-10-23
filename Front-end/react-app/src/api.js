import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9999/api", // URL backend của bạn
});

export default API;
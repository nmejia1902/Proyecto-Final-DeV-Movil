import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.40.2:5000",
  timeout: 5000
});
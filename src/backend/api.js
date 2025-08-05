import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000",
});

export const registerUser = (login, email, password) =>
  API.post("/register", { login, email, password });

export const loginUser = (login, password) =>
  API.post("/login", { login, password });

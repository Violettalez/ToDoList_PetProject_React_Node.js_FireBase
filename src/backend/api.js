import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000",
});

//Auth
export const registerUser = (login, email, password) =>
  API.post("/register", { login, email, password });

export const loginUser = (login, password) =>
  API.post("/login", { login, password });

//idToken з Firebase
function authHeader(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}
//Get a list of tasks with a filter
export const userData = (token, { date }) =>
  API.get("/tasks",{
    headers: { Authorization: `Bearer ${token}` },
    params: { date }
  });

//Create a task
export const addTask = (token, {title, category, date, status = "Active"}) => 
  API.post("/tasks", {title, category, date, status}, authHeader(token));

//Update a task
export const updateTask = (token, id, updateTask) =>
  API.put("/tasks/${id}", updateTask, authHeader(token));
//Delete a task
export const deleteTaskById = (token, id) =>
  API.delete("/tasks/${id}", authHeader(token));
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const getEmployees = () => API.get("/employees");

export const getEmployee = (id) => API.get(`/employees/${id}`);

export const addEmployee = (data) =>
  API.post("/employees", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateEmployee = (id, data) =>
  API.put(`/employees/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

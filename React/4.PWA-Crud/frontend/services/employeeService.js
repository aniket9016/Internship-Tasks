import axios from 'axios';

const API_URL = 'http://localhost:5000/employees';

export const getAllEmployees = () => axios.get(API_URL);

export const getEmployee = (id) => axios.get(`${API_URL}/${id}`);

export const addEmployee = (data) => {
  return axios.post(API_URL, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateEmployee = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);

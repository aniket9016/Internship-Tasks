import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000, // 10-second timeout
});

// Request interceptor (for headers, auth, etc.)
API.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor for consistent error logging
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Employee API endpoints
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

// Health check to verify API availability
export const checkApiConnection = async () => {
  try {
    const response = await API.get("/health", { timeout: 5000 });
    return response.status === 200;
  } catch {
    return false;
  }
};

// Bulk add operation
export const bulkAddEmployees = async (employees) => {
  return Promise.all(
    employees.map(async (employeeData) => {
      try {
        const response = await addEmployee(employeeData);
        return { success: true, data: response.data };
      } catch (error) {
        return { success: false, error: error.message };
      }
    })
  );
};

// Bulk update operation
export const bulkUpdateEmployees = async (employees) => {
  return Promise.all(
    employees.map(async ({ id, ...data }) => {
      try {
        const response = await updateEmployee(id, data);
        return { success: true, data: response.data };
      } catch (error) {
        return { success: false, error: error.message };
      }
    })
  );
};

export default API;

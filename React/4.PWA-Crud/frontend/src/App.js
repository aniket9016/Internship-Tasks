import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmployeeDetails from "./pages/EmployeeDetails";
import { ToastContainer, toast } from "react-toastify";
import { addEmployee } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

// Helper to read offline employees from localStorage
const getOfflineEmployees = () => {
  const data = localStorage.getItem("offlineEmployees");
  return data ? JSON.parse(data) : [];
};

// Helper to write updated offline employees
const setOfflineEmployees = (employees) => {
  localStorage.setItem("offlineEmployees", JSON.stringify(employees));
};

export default function App() {
  useEffect(() => {
    const handleOnline = async () => {
      const offlineEmployees = getOfflineEmployees();
      if (offlineEmployees.length > 0) {
        toast.info("Syncing offline employees...");
        const remaining = [];

        for (const emp of offlineEmployees) {
          try {
            const formData = new FormData();
            for (const [key, value] of Object.entries(emp)) {
              if (key === "profile_image" && value) {
                formData.append("profile_image", new File([value], value.name));
              } else {
                formData.append(key, value);
              }
            }

            await addEmployee(formData);
            toast.success(`Synced: ${emp.first_name} ${emp.last_name}`);
          } catch (err) {
            toast.error(`Failed to sync ${emp.first_name}`);
            remaining.push(emp); // Keep if failed
          }
        }

        setOfflineEmployees(remaining);
      }
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
      </Routes>
    </Router>
  );
}

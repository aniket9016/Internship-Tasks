import React from "react";
import { NavLink } from "react-router-dom";

const SidebarReducer = () => {
  return (
    <div
      className="bg-dark text-light p-4 vh-100 d-flex flex-column"
      style={{ position: "sticky", top: 0 }}
    >
      <h4 className="text-center mb-4 border-bottom pb-3">Redux Task</h4>
      <ul className="nav flex-column flex-grow-1">
        <li className="nav-item mb-2">
          <NavLink
            to="counterredux"
            className={({ isActive }) =>
              isActive
                ? "nav-link active text-warning fw-bold"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-clock me-2"></i> Counter
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="todoredux"
            className={({ isActive }) =>
              isActive
                ? "nav-link active text-warning fw-bold"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-clock me-2"></i> Todo
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="authredux"
            className={({ isActive }) =>
              isActive
                ? "nav-link active text-warning fw-bold"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-clock me-2"></i> Auth
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidebarReducer;

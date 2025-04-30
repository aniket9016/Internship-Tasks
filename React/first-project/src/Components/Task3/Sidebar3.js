import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar3 = () => {
  return (
    <div
      className="bg-dark text-light p-4 vh-100 d-flex flex-column"
      style={{ position: "sticky", top: 0 }}
    >
      <h4 className="text-center mb-4 border-bottom pb-3">Task 3</h4>
      <ul className="nav flex-column flex-grow-1">
        <li className="nav-item mb-2">
          <NavLink
            to="crudusingclass"
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
            to="studentcrud"
            className={({ isActive }) =>
              isActive
                ? "nav-link active text-warning fw-bold"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-clock me-2"></i> Class
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="studentcrudfunction"
            className={({ isActive }) =>
              isActive
                ? "nav-link active text-warning fw-bold"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-clock me-2"></i> Function
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="test"
            className={({ isActive }) =>
              isActive
                ? "nav-link active text-warning fw-bold"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-clock me-2"></i> Test
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="rough"
            className={({ isActive }) =>
              isActive
                ? "nav-link active text-warning fw-bold"
                : "nav-link text-light"
            }
          >
            <i className="bi bi-clock me-2"></i> Rough
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar3;

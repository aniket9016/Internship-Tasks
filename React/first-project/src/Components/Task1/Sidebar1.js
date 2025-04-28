import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar1 = () => {
  return (
    <div className="bg-dark text-light p-4 vh-100 d-flex flex-column" style={{ position: 'sticky', top: 0 }}>
      <h4 className="text-center mb-4 border-bottom pb-3">Task 1</h4>
      <ul className="nav flex-column flex-grow-1">
        <li className="nav-item mb-2">
          <NavLink
            to="clock"
            className={({ isActive }) =>
              isActive ? "nav-link active text-warning fw-bold" : "nav-link text-light"
            }
          >
            <i className="bi bi-clock me-2"></i> Clock
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="datafetch"
            className={({ isActive }) =>
              isActive ? "nav-link active text-warning fw-bold" : "nav-link text-light"
            }
          >
            <i className="bi bi-cloud-download me-2"></i> DataFetch
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="tictactoe"
            className={({ isActive }) =>
              isActive ? "nav-link active text-warning fw-bold" : "nav-link text-light"
            }
          >
            <i className="bi bi-controller me-2"></i> TicTacToe
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar1;

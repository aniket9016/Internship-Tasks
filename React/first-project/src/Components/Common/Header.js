import React from "react";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          {props.title}
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active text-warning" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/task1"
                className={({ isActive }) =>
                  isActive ? "nav-link active text-warning" : "nav-link"
                }
              >
                Task 1
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/task2"
                className={({ isActive }) =>
                  isActive ? "nav-link active text-warning" : "nav-link"
                }
              >
                Task 2
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/task3"
                className={({ isActive }) =>
                  isActive ? "nav-link active text-warning" : "nav-link"
                }
              >
                Task 3
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/redux"
                className={({ isActive }) =>
                  isActive ? "nav-link active text-warning" : "nav-link"
                }
              >
                Redux
              </NavLink>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="button">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;

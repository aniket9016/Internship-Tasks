import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Header = (props) => {
  const cartCount = useSelector((state) => state.cart.items.length);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow position-relative">
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
                Product
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="counter"
                className={({ isActive }) =>
                  isActive ? "nav-link active text-warning" : "nav-link"
                }
              >
                Counter
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="todo"
                className={({ isActive }) =>
                  isActive ? "nav-link active text-warning" : "nav-link"
                }
              >
                Todo
              </NavLink>
            </li>
          </ul>

          {/* <form className="d-flex me-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="button">
              Search
            </button>
          </form> */}

          <NavLink
            to="/cart"
            className="btn btn-outline-light position-relative"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ minWidth: "20px", fontSize: "0.75rem", padding: "4px" }}
            >
              {cartCount}
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;

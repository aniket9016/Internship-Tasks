import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar2 = () => {
    return (
        <div className="bg-dark text-light p-4 vh-100 d-flex flex-column" style={{ position: 'sticky', top: 0 }}>
            <h4 className="text-center mb-4 border-bottom pb-3">Task 2</h4>
            <ul className="nav flex-column flex-grow-1">
                <li className="nav-item mb-2">
                    <NavLink
                        to="counter"
                        className={({ isActive }) =>
                            isActive ? "nav-link active text-warning fw-bold" : "nav-link text-light"
                        }
                    >
                        <i className="bi bi-clock me-2"></i> Counter
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink
                        to="fetchapi"
                        className={({ isActive }) =>
                            isActive ? "nav-link active text-warning fw-bold" : "nav-link text-light"
                        }
                    >
                        <i className="bi bi-cloud-download me-2"></i> FetchApi
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink
                        to="todo"
                        className={({ isActive }) =>
                            isActive ? "nav-link active text-warning fw-bold" : "nav-link text-light"
                        }
                    >
                        <i className="bi bi-cloud-download me-2"></i> Todo
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink
                        to="register"
                        className={({ isActive }) =>
                            isActive ? "nav-link active text-warning fw-bold" : "nav-link text-light"
                        }
                    >
                        <i className="bi bi-controller me-2"></i> Register
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar2;

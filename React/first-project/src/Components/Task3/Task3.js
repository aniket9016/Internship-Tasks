import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar3';

const Task3 = () => {
    return (
        <div className="container-fluid p-0">
            <div className="row g-0 min-vh-100">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10 bg-light p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Task3;

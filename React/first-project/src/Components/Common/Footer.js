import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {
    return (
        <footer className="bg-dark text-light py-4">
            <div className="container text-center">
                <p className="mb-1">&copy; 2025 {props.companyname}. All rights reserved.</p>
                <div>
                    <Link to="/" className="text-light mx-2">Privacy Policy</Link> |
                    <Link to="/" className="text-light mx-2">Terms of Service</Link> |
                    <Link to="/" className="text-light mx-2">Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

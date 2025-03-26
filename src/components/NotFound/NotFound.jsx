import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <h2 className="mb-3 text-secondary">Oops! Page Not Found</h2>
            <p className="text-muted text-center">
                The page you are looking for might have been removed <br />
                or is temporarily unavailable.
            </p>
            <Link to="*" className="btn btn-primary mt-3 px-4 py-2">
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;

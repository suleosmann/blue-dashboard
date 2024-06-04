import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user  = JSON.parse(localStorage.getItem('user'))
    const location = useLocation();

    // Redirect to the login page if there is no user logged in
    if (!user) {
        // Redirect them to the login page, but save the current location they were trying to go to
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // If the user is logged in, allow access to the route
    return children;
};

export default ProtectedRoute

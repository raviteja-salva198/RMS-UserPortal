import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;



// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = ({ isAuthenticated, redirectPath = '/login' }) => {
//   if (!isAuthenticated) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("auth-token");
  return token ? children : <Navigate to="/login"></Navigate>;
}

export default ProtectedRoute;

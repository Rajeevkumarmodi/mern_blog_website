import React from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth-token");

  if (!token) {
    navigate("/login");
  }
  return <div>{children}</div>;
}

export default ProtectedRoute;

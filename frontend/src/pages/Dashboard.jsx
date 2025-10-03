import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminDashboard } from "./AdminDashboard.jsx";
import { StudentDashboard } from "./StudentDashboard.jsx";

export const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    if (!role) navigate("/"); 
  }, [role, navigate]);

  if (role === "admin") return <AdminDashboard />;
  if (role === "student") return <StudentDashboard />;

  return <h2>Unauthorized</h2>;
};

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaUserGraduate,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

export const Layout = ({ children, role }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  if (!userRole || (role && userRole !== role)) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("student");
    localStorage.removeItem("currentStudent");
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 bg-dark d-flex flex-column p-3 sidebar">
          <h5 className="mb-3 text-center bg-primary bg-gradient p-2 text-white">
            COURSEMATE
          </h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link
                className="nav-link d-flex align-items-center"
                to="/dashboard"
              >
                <FaTachometerAlt className="me-2" /> Dashboard
              </Link>
            </li>
            {userRole === "admin" && (
              <>
                <li className="nav-item mb-2">
                  <Link
                    className="nav-link d-flex align-items-center"
                    to="/courses"
                  >
                    <FaBook className="me-2" /> Courses
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    className="nav-link d-flex align-items-center"
                    to="/students"
                  >
                    <FaUserGraduate className="me-2" /> Students
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    className="nav-link d-flex align-items-center"
                    to="/enrollment"
                  >
                    <FaClipboardList className="me-2" /> Enrollment
                  </Link>
                </li>
              </>
            )}
          </ul>

          <button
            className="btn btn-outline-danger mt-auto w-100 d-flex align-items-center justify-content-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="col-md-10 main-content">{children}</div>
      </div>
    </div>
  );
};

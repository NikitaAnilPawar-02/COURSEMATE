import React, { useContext } from "react";
import { EnrollmentContext } from "../context/EnrollmentContext.jsx";
import { Layout } from "../components/Layout.jsx";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
  const { courses, students, enrollments, deleteCourse, deleteStudent } =
    useContext(EnrollmentContext);

  return (
    <Layout role="admin">
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center">
          <h2 className="mb-5">Admin Dashboard</h2>
        </div>

        {/* Quick Stats */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card text-center p-3 shadow-sm">
              <h5>Total Courses</h5>
              <h3>{courses.length}</h3>
              <Link to="/courses" className="btn btn-outline-primary mt-2">
                Manage Courses
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center p-3 shadow-sm">
              <h5>Total Students</h5>
              <h3>{students.length}</h3>
              <Link to="/students" className="btn btn-outline-primary mt-2">
                Manage Students
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center p-3 shadow-sm">
              <h5>Total Enrollments</h5>
              <h3>{enrollments.length}</h3>
              <Link to="/enrollment" className="btn btn-outline-primary mt-2">
                Manage Enrollments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

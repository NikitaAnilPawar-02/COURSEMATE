import React, { useContext } from "react";
import { EnrollmentContext } from "../context/EnrollmentContext.jsx";
import { Layout } from "../components/Layout.jsx";

export const StudentDashboard = () => {
  const { enrollments } = useContext(EnrollmentContext);

  const studentData = JSON.parse(localStorage.getItem("currentStudent"));
  const studentId = studentData?.id;

  const myEnrollments = enrollments.filter((e) => e.student.id === studentId);

  return (
    <Layout role="student">
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center">
          <h2 className="mb-4">Student Dashboard</h2>
        </div>

        <div className="card p-3 shadow-sm">
          <h5>My Courses</h5>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Duration</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              {myEnrollments.map((e) => {
                const course = e.course; 
                return course ? (
                  <tr key={course.id}>
                    <td>{course.name}</td>
                    <td>{course.duration}</td>
                    <td>{course.startDate}</td>
                    <td>{course.endDate}</td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        </div>

        <div className="card p-3 mt-3 shadow-sm">
          <h5>Enrollment Status</h5>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Course</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myEnrollments.map((e) => {
                const course = e.course; 
                return course ? (
                  <tr key={e.id}>
                    <td>{course.name}</td>
                    <td>{e.status}</td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

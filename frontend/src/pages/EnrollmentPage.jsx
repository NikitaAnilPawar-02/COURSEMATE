import React from "react";
import { EnrollmentForm } from "../components/EnrollmentForm.jsx";
import { EnrollmentList } from "../components/EnrollmentList.jsx";
import { Layout } from "../components/Layout.jsx";

export const EnrollmentPage = () => {
  return (
    <Layout role="admin">
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center">
          <h2 className="mb-4">Enrollments</h2>
        </div>
        <EnrollmentForm />
        <EnrollmentList />
      </div>
    </Layout>
  );
};

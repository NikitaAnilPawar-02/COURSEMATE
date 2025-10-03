import React from "react";
import { CourseForm } from "../components/CourseForm.jsx";
import { CourseList } from "../components/CourseList.jsx";
import { Layout } from "../components/Layout.jsx";

export const CoursesPage = () => {
  return (
    <Layout role="admin">
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center">
          <h2 className="mb-4">Courses</h2>
        </div>

        <CourseForm />
        <CourseList />
      </div>
    </Layout>
  );
};

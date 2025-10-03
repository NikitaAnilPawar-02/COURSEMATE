import React, { useEffect, useState } from "react";
import { StudentForm } from "../components/StudentForm.jsx";
import { StudentList } from "../components/StudentList.jsx";
import { Layout } from "../components/Layout.jsx";

export const StudentsPage = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/students");
      if (!res.ok) throw new Error("Failed to fetch students");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Layout role="admin">
      <div className="container mt-4">
        <h2 className="text-center mb-4">Students</h2>

        {/* Student Form always visible */}
        <StudentForm onStudentAdded={fetchStudents} />

        {/* Student List below the form */}
        <StudentList students={students} onStudentUpdated={fetchStudents} />
      </div>
    </Layout>
  );
};

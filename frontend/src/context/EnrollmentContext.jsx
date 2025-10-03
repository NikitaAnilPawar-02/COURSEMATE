import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EnrollmentContext = createContext();

export const EnrollmentProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const API_BASE = "http://localhost:8080/api";

  const fetchCourses = async () => {
    const res = await axios.get(`${API_BASE}/courses`);
    setCourses(res.data);
  };

  const addCourse = async (course) => {
    const res = await axios.post(`${API_BASE}/courses`, course);
    setCourses(prev => [...prev, res.data]);
  };

  const editCourse = async (course) => {
    const res = await axios.put(`${API_BASE}/courses/${course.id}`, course);
    setCourses(prev => prev.map(c => (c.id === res.data.id ? res.data : c)));
  };

  const deleteCourse = async (id) => {
    await axios.delete(`${API_BASE}/courses/${id}`);
    setCourses(prev => prev.filter(c => c.id !== id));
    setEnrollments(prev => prev.filter(e => e.courseId !== id));
  };

  const fetchStudents = async () => {
    const res = await axios.get(`${API_BASE}/students`);
    setStudents(res.data);
  };

  const addStudent = async (student) => {
    const res = await axios.post(`${API_BASE}/students`, student);
    setStudents(prev => [...prev, res.data]);
  };

  const editStudent = async (student) => {
    const res = await axios.put(`${API_BASE}/students/${student.id}`, student);
    setStudents(prev => prev.map(s => (s.id === res.data.id ? res.data : s)));
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API_BASE}/students/${id}`);
    setStudents(prev => prev.filter(s => s.id !== id));
    setEnrollments(prev => prev.filter(e => e.studentId !== id));
  };

  const changeStudentPassword = async (id, newPassword) => {
    const res = await axios.put(`${API_BASE}/students/${id}`, {
      password: newPassword,
      firstLogin: false,
    });
    setStudents(prev => prev.map(s => (s.id === res.data.id ? res.data : s)));
    return res.data;
  };

  const fetchEnrollments = async () => {
    const res = await axios.get(`${API_BASE}/enrollments`);
    setEnrollments(res.data);
  };

  const assignStudent = async (data) => {
  await axios.post("http://localhost:8080/api/enrollments", data);
  fetchEnrollments();
};


  const updateEnrollment = async (id, updatedData) => {
    const res = await axios.put(`${API_BASE}/enrollments/${id}`, updatedData);
    setEnrollments(prev => prev.map(e => (e.id === id ? res.data : e)));
  };

  const deleteEnrollment = async (id) => {
    await axios.delete(`${API_BASE}/enrollments/${id}`);
    setEnrollments(prev => prev.filter(e => e.id !== id));
  };

  useEffect(() => {
    fetchCourses();
    fetchStudents();
    fetchEnrollments();
  }, []);

  return (
    <EnrollmentContext.Provider
  value={{
    courses,
    students,
    enrollments,
    addCourse,
    editCourse,
    deleteCourse,
    addStudent,
    editStudent,
    deleteStudent,
    changeStudentPassword,
    assignStudent,
    updateEnrollment,
    deleteEnrollment,
    fetchEnrollments,  
  }}
>
  {children}
</EnrollmentContext.Provider>

  );
};

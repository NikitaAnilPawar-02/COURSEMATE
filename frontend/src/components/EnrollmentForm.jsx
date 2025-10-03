import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { EnrollmentContext } from "../context/EnrollmentContext.jsx";

export const EnrollmentForm = () => {
  const { students, courses, assignStudent } = useContext(EnrollmentContext);

  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [status, setStatus] = useState("Active");
  const [message, setMessage] = useState({ type: "", text: "" });


const handleAssign = async () => {
  if (!studentId || !courseId) {
    setMessage({
      type: "danger",
      text: "Please select student and course.",
    });
    return;
  }

  try {
   await assignStudent({
  student: { id: studentId },
  course: { id: courseId },
  status,
});


    setMessage({ type: "success", text: "Student enrolled successfully!" });

    setStudentId("");
    setCourseId("");
    setStatus("Active");
  } catch (error) {
    console.error(error);
    setMessage({ type: "danger", text: "Failed to enroll student." });
  }
};


  return (
    <div className="card p-3 mb-3 shadow-sm">
      <h4 className="text-center mb-3">Enroll Student in Course</h4>

      {message.text && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Select Student</label>
        <select
          className="form-select"
          value={studentId}
          onChange={(e) => setStudentId(Number(e.target.value))}
        >
          <option value="">-- Choose Student --</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Select Course</label>
        <select
          className="form-select"
          value={courseId}
          onChange={(e) => setCourseId(Number(e.target.value))}
        >
          <option value="">-- Choose Course --</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Enrollment Status</label>
        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Dropped">Dropped</option>
        </select>
      </div>

      <button
        className="btn btn-primary w-100 bg-gradient"
        onClick={handleAssign}
      >
        Enroll Student
      </button>
    </div>
  );
};

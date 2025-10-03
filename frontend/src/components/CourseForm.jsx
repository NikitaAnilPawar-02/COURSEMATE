import React, { useState, useContext } from "react";
import { EnrollmentContext } from "../context/EnrollmentContext.jsx";

export const CourseForm = () => {
  const { addCourse } = useContext(EnrollmentContext);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleAdd = async () => {
    if (!name || !duration || !startDate || !endDate) {
      setMessage({ type: "danger", text: "Please fill all required fields." });
      return;
    }

    try {
      await addCourse({
        name,
        description: desc,
        duration,
        startDate,
        endDate,
      });

      setMessage({ type: "success", text: "Course added successfully!" });

      setName("");
      setDesc("");
      setDuration("");
      setStartDate("");
      setEndDate("");

      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error(error);
      setMessage({ type: "danger", text: "Failed to add course." });
    }
  };

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h4 className="mb-3 text-center">Add New Course</h4>

      {message.text && (
        <div className={`alert alert-${message.type} py-2`} role="alert">
          {message.text}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Course Name</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows="3"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Duration</label>
        <select
          className="form-select"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="">Select Duration</option>
          <option value="4 weeks">4 Weeks</option>
          <option value="8 weeks">8 Weeks</option>
          <option value="12 weeks">12 Weeks</option>
          <option value="16 weeks">16 Weeks</option>
        </select>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <button
        className="btn btn-primary w-100"
        onClick={handleAdd}
        disabled={!name || !duration || !startDate || !endDate}
      >
        Add Course
      </button>
    </div>
  );
};

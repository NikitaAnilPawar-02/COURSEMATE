import React, { useState } from "react";

export const StudentForm = ({ onStudentAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const validateForm = () => {
    const nameRegex = /^[A-Za-z ]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!nameRegex.test(name)) return "Enter a valid student name (only letters, min 2 chars).";
    if (!emailRegex.test(email)) return "Enter a valid email address.";
    if (!phoneRegex.test(phone)) return "Enter a valid 10-digit phone number.";
    if (!dob) return "Please select a Date of Birth.";
    if (new Date(dob) > new Date()) return "Date of Birth cannot be in the future.";
    if (!gender) return "Please select gender.";
    if (!nameRegex.test(parentName)) return "Enter a valid parent name (only letters).";
    if (!phoneRegex.test(parentPhone)) return "Enter a valid 10-digit parent phone number.";

    return null;
  };

  const handleAdd = async () => {
    const error = validateForm();
    if (error) {
      setMessage({ type: "danger", text: error });
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, dob, gender, parentName, parentPhone }),
      });

      if (!res.ok) throw new Error("Failed to add student");

      setMessage({ type: "success", text: "Student added successfully!" });

      setName(""); setEmail(""); setPhone(""); setDob(""); setGender("");
      setParentName(""); setParentPhone("");

      if (onStudentAdded) onStudentAdded();
    } catch (err) {
      console.error(err);
      setMessage({ type: "danger", text: "Error adding student" });
    }
  };

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h4 className="mb-3 text-center">Add New Student</h4>

      {message.text && (
        <div className={`alert alert-${message.type} py-2`}>{message.text}</div>
      )}

      <div className="mb-2">
        <label className="form-label">Student Name</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Phone</label>
        <input
          type="tel"
          className="form-control"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="row mb-2">
        <div className="col-md-6">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label d-block">Gender</label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              name="gender"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label className="form-check-label">Male</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              name="gender"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label className="form-check-label">Female</label>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <label className="form-label">Parent Name</label>
        <input
          className="form-control"
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Parent Phone</label>
        <input
          className="form-control"
          value={parentPhone}
          onChange={(e) => setParentPhone(e.target.value)}
        />
      </div>

      <button className="btn btn-primary w-100" onClick={handleAdd}>
        Add Student
      </button>
    </div>
  );
};

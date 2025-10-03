import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const tempStudent = JSON.parse(localStorage.getItem("tempStudent"));

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = async () => {
    if (!newPassword || !confirmPassword) {
      setMessage({ type: "danger", text: "Please fill all fields." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: "danger", text: "Passwords do not match!" });
      return;
    }

    try {
   await axios.put(
  `http://localhost:8080/api/students/${tempStudent.id}/change-password`,
  { newPassword }, 
  { headers: { "Content-Type": "application/json" } }
);


      localStorage.setItem("userRole", "student");
      localStorage.setItem(
        "currentStudent",
        JSON.stringify({
          ...tempStudent,
          password: newPassword,
          firstLogin: false,
        })
      );
      localStorage.removeItem("tempStudent");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setMessage({ type: "danger", text: "Something went wrong!" });
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
      }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "350px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-3">Change Password</h3>
        {message.text && (
          <div className={`alert alert-${message.type} text-center`}>
            {message.text}
          </div>
        )}
        <input
          type="password"
          placeholder="New Password"
          className="form-control mb-3"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="form-control mb-3"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="btn btn-primary w-100"
          style={{ borderRadius: "10px" }}
          onClick={handleChange}
        >
          Save Password
        </button>
      </div>
    </div>
  );
};

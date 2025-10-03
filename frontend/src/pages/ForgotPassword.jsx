import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

const handleReset = async () => {
  if (!email || !oldPassword || !newPassword || !confirmPassword) {
    setMessage({ type: "danger", text: "Please fill all fields." });
    return;
  }
  if (newPassword !== confirmPassword) {
    setMessage({ type: "danger", text: "Passwords do not match!" });
    return;
  }

  try {
    const res = await axios.get("http://localhost:8080/api/students");
    const student = res.data.find((s) => s.email === email);

    if (!student) {
      setMessage({ type: "danger", text: "Email not found!" });
      return;
    }

    await axios.put(`http://localhost:8080/api/students/${student.id}/change-password`, {
      password: oldPassword,     
      newPassword: newPassword,    
    });

    setMessage({ type: "success", text: "Password reset successfully!" });
    setTimeout(() => navigate("/"), 2000);
  } catch (err) {
    console.error(err);
    setMessage({ type: "danger", text: "Invalid old password or error occurred!" });
  }
};


  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)" }}>
      <div className="card shadow p-4" style={{ width: "350px", borderRadius: "15px" }}>
        <h3 className="text-center mb-3">Forgot Password</h3>
        {message.text && <div className={`alert alert-${message.type} text-center`}>{message.text}</div>}
        <input type="email" placeholder="Email" className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Old Password" className="form-control mb-3" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        <input type="password" placeholder="New Password" className="form-control mb-3" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <input type="password" placeholder="Confirm New Password" className="form-control mb-3" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button className="btn btn-primary w-100" style={{ borderRadius: "10px" }} onClick={handleReset}>Reset Password</button>
      </div>
    </div>
  );
};

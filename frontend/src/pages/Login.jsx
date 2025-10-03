import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("userRole", "admin");
      navigate("/dashboard");
      return;
    }

    try {
      const res = await axios.get("http://localhost:8080/api/students");
      const student = res.data.find((s) => s.email === email && s.password === password);

      if (!student) {
        alert("Invalid credentials!");
        return;
      }

      if (student.firstLogin) {
        localStorage.setItem("tempStudent", JSON.stringify(student));
        navigate("/change-password");
        return;
      }

      localStorage.setItem("userRole", "student");
      localStorage.setItem("currentStudent", JSON.stringify(student));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)" }}>
      <div className="card shadow p-4" style={{ width: "350px", borderRadius: "15px" }}>
        <h3 className="text-center mb-3">Welcome Back!!</h3>
        <p className="text-center text-muted">Please login to continue</p>
        <input type="email" className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100" onClick={handleLogin} style={{ borderRadius: "10px" }}>Login</button>
        <div className="text-center mt-3">
          <small className="text-muted">
            Forgot password? <Link to="/forgot-password" style={{ textDecoration: "none" }}>Reset here</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

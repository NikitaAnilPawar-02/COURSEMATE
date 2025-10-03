import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EnrollmentProvider } from "./context/EnrollmentContext.jsx";
import { Login } from "./pages/Login.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { CoursesPage } from "./pages/CoursesPage.jsx";
import { StudentsPage } from "./pages/StudentsPage.jsx";
import { EnrollmentPage } from "./pages/EnrollmentPage.jsx";
import { ForgotPassword } from "./pages/ForgotPassword.jsx";
import { ChangePassword } from "./pages/ChangePassword.jsx";

function App() {
  return (
    <EnrollmentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/enrollment" element={<EnrollmentPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </Router>
    </EnrollmentProvider>
  );
}

export default App;

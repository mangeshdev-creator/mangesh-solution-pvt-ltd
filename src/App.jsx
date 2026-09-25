import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CourseDetails from "./pages/CourseDetails";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Courses from "./pages/Courses";
import Mentors from "./pages/Mentors";
import MentorProfile from "./pages/MentorProfile";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Enroll from "./pages/Enroll";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AdminLoginModal from "./components/AdminLoginModal";
import ResetPassword from "./pages/ResetPassword";

function ProtectedRoute({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem("mangesh_token"));

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("mangesh_user") || "null");
  return user?.role === "admin"
    ? children
    : <Navigate to="/" replace />;
}

function App() {
  return (
    <AppContent />
  );
}

function AppContent() {
  const location = useLocation();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname.startsWith("/reset-password/");

  useEffect(() => {
    const handleControlKey = (event) => {
      if (event.key === "Control") setShowAdminLogin(true);
    };

    window.addEventListener("keydown", handleControlKey);
    return () => window.removeEventListener("keydown", handleControlKey);
  }, []);

  return (
    <>
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/mentors" element={<ProtectedRoute><Mentors /></ProtectedRoute>} />
        <Route path="/mentor/:id" element={<ProtectedRoute><MentorProfile /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/course/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
        <Route path="/enroll/:id" element={<ProtectedRoute><Enroll /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
      </Routes>

      {!isAuthPage && <Footer />}
      {showAdminLogin && <AdminLoginModal onClose={() => setShowAdminLogin(false)} />}
    </>
  );
}

export default App;

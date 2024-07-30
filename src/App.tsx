import React from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/public/home-page";
import AboutUsPage from "./pages/public/about-us-page";
import DashboardPage from "./pages/profile/dashboard-page";
import LoginPage from "./pages/auth/login-page";

const AuthGaurd: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem("token") ?? "";
  const isLogin = token.length > 0 ? true : false 
  if (!isLogin) 
    return <Navigate to="/login" />

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />

        {/* Profile Routes */}
        <Route
          path="/dashboard"
          element={
            <AuthGaurd>
              <DashboardPage />
            </AuthGaurd>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

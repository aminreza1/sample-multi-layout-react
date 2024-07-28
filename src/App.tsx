import React from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/public/home-page";
import AboutUsPage from "./pages/public/about-us-page";
import DashboardPage from "./pages/profile/dashboard-page";

const AuthGaurd: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isLogin = true;
  if (!isLogin) 
    return <Navigate to="/" />

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
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

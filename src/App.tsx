import React, { useContext } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/public/home-page";
import AboutUsPage from "./pages/public/about-us-page";
import DashboardPage from "./pages/admin/dashboard-page";
import LoginPage from "./pages/auth/login-page";
import { AuthContext } from "./store/auth-context";
import CreateProductPage from "./pages/admin/create-product-page";
import ProductListPage from "./pages/admin/product-list-page";

const AuthGaurd: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authCtx = useContext(AuthContext);
  if (!authCtx.authData.isAuth) return <Navigate to="/login" />;
  return <>{children}</>;
};

const AuthGaurdReverse: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authCtx = useContext(AuthContext);
  if (authCtx.authData.isAuth) return <Navigate to="/" />;
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <AuthGaurdReverse>
              <LoginPage />
            </AuthGaurdReverse>
          }
        />
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
        <Route
          path="/dashboard/products"
          element={
            <AuthGaurd>
              <ProductListPage />
            </AuthGaurd>
          }
        />
        <Route
          path="/dashboard/products/create"
          element={
            <AuthGaurd>
              <CreateProductPage />
            </AuthGaurd>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

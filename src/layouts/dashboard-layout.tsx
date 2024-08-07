import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";

const DashboardLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)
  return (
    <div>
      <h1 className="bg-indigo-600 text-white p-4 text-2xl">Admin Panel</h1>
      <div className="flex gap-4 p-4 bg-gray-200">
        <div>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div>
          <Link to="/dashboard/products">Products</Link>
        </div>
        
        
        <div className="flex-auto"></div>
        <div><button className="font-semibold" onClick={authCtx.logout}>Logout</button></div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;

import React from "react";
import DashboardLayout from "../../layouts/dashboard-layout";

const DashboardPageContent: React.FC = () => {
  return <div>
    <h2 className="alert ">Welcome to Admin Panel</h2>
  </div>;
};

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <DashboardPageContent />
    </DashboardLayout>
  );
};

export default DashboardPage;

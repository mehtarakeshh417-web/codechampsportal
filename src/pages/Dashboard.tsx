import { Routes, Route } from "react-router-dom";

const DashboardHome = () => (
  <div className="min-h-screen bg-background p-6">
    <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
    <p className="text-muted-foreground mt-2">Welcome to CodeChamps</p>
  </div>
);

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
    </Routes>
  );
};

export default Dashboard;

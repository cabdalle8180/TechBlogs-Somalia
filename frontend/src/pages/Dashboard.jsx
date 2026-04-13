import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* THIS IS REQUIRED */}
      <Outlet />
    </div>
  );
}

export default Dashboard;
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
function Dashboard() {
  return (
    <div className="flex relative">
      <div>
        <Sidebar/>
      </div>
      {/* THIS IS REQUIRED */}
      <div className="flex-1 p-8">  
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
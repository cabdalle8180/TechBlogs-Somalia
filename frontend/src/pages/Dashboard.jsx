// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout as logoutThunk } from "../redux/api/userSlice";
// import { toast } from "react-toastify";
// function Dashboard() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const onLogout = async () => {
//     const result = await dispatch(logoutThunk());
//     if (logoutThunk.fulfilled.match(result)) {
//       toast.success("Logged out");
//       navigate("/");
//     } else {
//       toast.error(result.payload?.message || "Logout failed");
//     }
//   };

//   return (
//     <div className="flex relative">
//       <div className="hidden md:block">
//         <Sidebar/>
//       </div>
//       {/* THIS IS REQUIRED */}
//       <div className="flex-1 p-4 md:p-8">
//         {/* Mobile dashboard nav */}
//         <div className="md:hidden mb-4 flex items-center gap-2 overflow-x-auto">
//           <Link className="px-3 py-2 rounded-md bg-slate-900 text-white whitespace-nowrap" to="/dashboard/posts">Posts</Link>
//           <Link className="px-3 py-2 rounded-md border border-slate-300 bg-white whitespace-nowrap" to="/dashboard/create-post">Create</Link>
//           <button onClick={onLogout} className="px-3 py-2 rounded-md border border-red-300 text-red-700 bg-white whitespace-nowrap">
//             Logout
//           </button>
//         </div>
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;









import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { logout as logoutThunk, resetStatus } from "../redux/api/userSlice";
import { toast } from "react-toastify";
import { TbLayoutDashboard, TbPlus, TbLogout, TbSmartHome } from "react-icons/tb";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = async () => {
    const result = await dispatch(logoutThunk());
    if (logoutThunk.fulfilled.match(result)) {
      toast.success("Si guul leh ayaad uga baxday");
      navigate("/");
      dispatch(resetStatus());
    } else {
      toast.error(result.payload?.message || "Logout failed");
    }
  };

  // Helper function for active mobile links
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:block sticky top-0 h-screen">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Navigation Header */}
        <header className="md:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">T</div>
               <span className="font-bold text-slate-900 tracking-tight">TechBlog</span>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <TbLogout size={20} />
            </button>
          </div>

          <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                isActive("/dashboard") ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-white text-slate-600 border border-slate-200"
              }`}
            >
              <TbSmartHome size={16} /> Dashboard
            </Link>
            <Link 
              to="/dashboard/posts" 
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                isActive("/dashboard/posts") ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-white text-slate-600 border border-slate-200"
              }`}
            >
              <TbLayoutDashboard size={16} /> My Posts
            </Link>
            <Link 
              to="/dashboard/create-post" 
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                isActive("/dashboard/create-post") ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-white text-slate-600 border border-slate-200"
              }`}
            >
              <TbPlus size={16} /> Create
            </Link>
          </nav>
        </header>

        {/* Dynamic Content (Outlet) */}
        <div className="flex-1 p-4 md:p-10 lg:p-12">
          {/* Dashboard Breadcrumbs or Greeting - Optional */}
          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-400 mb-6 uppercase tracking-widest">
             <Link to="/" className="hover:text-indigo-600">Home</Link> 
             <span>/</span> 
             <span className="text-slate-900 font-bold">Dashboard</span>
          </div>

          <div className="relative">
            <Outlet />
          </div>
        </div>

        {/* Footer info for mobile */}
        <footer className="md:hidden p-6 text-center text-[10px] text-slate-400 uppercase tracking-[0.2em]">
          TechBlog Studio © 2026
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
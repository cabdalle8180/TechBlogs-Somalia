import React, { useState } from "react";
import { FaHome, FaRegUser } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { IoIosCreate } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { TbLogs } from "react-icons/tb";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutThunk } from "../redux/api/userSlice";
import { toast } from "react-toastify";
import { FaUsers } from "react-icons/fa";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state) => state.user?.currentUser);
  console.log(currentUser);
  
  // 🔐 Logout
  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutThunk());

      if (logoutThunk.fulfilled.match(result)) {
        toast.success("Logged out successfully");
        navigate("/");
      } else {
        toast.error(result.payload?.message || "Logout failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  // 📌 Active Route
  const isActive = (path) => location.pathname.startsWith(path);

  // 📋 Menu Items
  const menuItems = [
    { name: "My Posts", icon: <TbLogs size={20} />, path: "/dashboard/posts" },
    { name: "Create Post", icon: <IoIosCreate size={20} />, path: "/dashboard/create-post" },
    { name: "Profile", icon: <FaRegUser size={20} />, path: "/dashboard/profile" },

    ...(currentUser?.isAdmin ? [{ name: "Users", icon: <FaUsers size={20} />, path: "/dashboard/users" }] : []),

    { name: "Logout", icon: <LuLogOut size={20} />, action: handleLogout, danger: true },
  ];

  return (
    <aside
      className={`h-screen sticky top-0 bg-slate-950/80 border-r border-white/5 transition-all duration-500 flex flex-col ${
        isOpen ? "w-72" : "w-[88px]"
      }`}
    >
      {/* Toggle */}
      <button
        aria-label="Toggle Sidebar"
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-4 top-10 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-lg"
      >
        <FiChevronRight
          className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold">
            T
          </div>
          {isOpen && <span className="text-white font-bold">Tech</span>}
        </Link>
      </div>

      {/* User */}
      {currentUser && (
        <div className="px-4 mb-6">
          <div className={`flex items-center gap-3 ${!isOpen && "justify-center"}`}>
            <div className="w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center">
              {currentUser.username?.[0]?.toUpperCase()}
            </div>

            {isOpen && (
              <div>
                <p className="text-white text-sm">{currentUser.username}</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => {
          const active = item.path && isActive(item.path);

          const baseClass = `flex items-center gap-3 p-3 rounded-xl transition ${
            active
              ? "bg-indigo-600 text-white"
              : item.danger
              ? "text-red-400 hover:bg-red-500/10"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
          } ${!isOpen && "justify-center"}`;

          if (item.path) {
            return (
              <Link
                key={item.name}
                to={item.path}
                className={baseClass}
                title={!isOpen ? item.name : ""}
              >
                {item.icon}
                {isOpen && <span>{item.name}</span>}
              </Link>
            );
          }

          return (
            <button
              key={item.name}
              onClick={item.action}
              className={baseClass}
              title={!isOpen ? item.name : ""}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4">
        <Link
          to="/"
          className={`flex items-center gap-2 text-indigo-400 ${
            !isOpen && "justify-center"
          }`}
        >
          <FaHome />
          {isOpen && <span className="text-xs">Version 2.0</span>}
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
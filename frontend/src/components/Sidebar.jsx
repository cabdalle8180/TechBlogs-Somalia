import React, { useState } from 'react';
import { FaHome, FaUserAlt } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { IoIosCreate, IoMdArrowRoundBack } from 'react-icons/io';
import { LuLogOut } from 'react-icons/lu';
import { TbLogs } from 'react-icons/tb';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const logout = () => {
        alert("Logout successful");
    };

    const menuItems = [
        { name: "Dashboard", icon: <FaHome size={22}/>, path: "/dashboard" },
        { name: "Posts", icon: <TbLogs size={22}/>, path: "/dashboard/posts" },
        { name: "Create Post", icon: <IoIosCreate size={22}/>, path: "/dashboard/create-post" },
        { name: "Profile", icon: <FaUserAlt size={20}/>, path: "/dashboard/profile" },
        { name: "Logout", icon: <LuLogOut size={22}/>, action: logout },
    ];

    return (
        <div 
            className={`h-screen bg-slate-900 sticky top-0 text-white transition-all duration-300 relative ${
                isOpen ? "w-64" : "w-20"
            }`}
        >
            {/* Badhanka dhinaca ka riixa (Toggle Button) */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="absolute -right-3 top-9 bg-slate-800 text-white p-1 rounded-full border-2 border-white z-50"
            >
                <FiChevronRight 
                    className={`w-5 h-5 transition-transform duration-500 ${isOpen ? "rotate-180" : "rotate-0"}`} 
                />
            </button>

            {/* Qaybta Sare/Logo */}
            <div className="flex flex-col p-5 gap-y-4">
                <div className="flex items-center gap-x-4">
                    <Link to="/" className="shrink-0">
                        <IoMdArrowRoundBack size={25} className={`duration-500 ${isOpen && "rotate-[360deg]"}`} />
                    </Link>
                    <h1 className={`font-bold text-xl origin-left transition-all duration-300 ${!isOpen && "scale-0 hidden"}`}>
                        My App
                    </h1>
                </div>
                <hr className="border-slate-700" />
            </div>

            {/* Navigashinka (Menu-yada) */}
            <nav className="mt-2">
                {menuItems.map((item, index) => (
                    <div key={index}>
                        {item.path ? (
                            <Link 
                                to={item.path} 
                                className="flex items-center gap-x-4 p-3 mx-2 rounded-md hover:bg-slate-800 transition-all cursor-pointer group"
                            >
                                <div className="shrink-0">{item.icon}</div>
                                <span className={`transition-all duration-300 ${!isOpen && "hidden"}`}>
                                    {item.name}
                                </span>
                            </Link>
                        ) : (
                            <button 
                                onClick={item.action}
                                className="flex items-center gap-x-4 p-3 mx-2 w-[calc(100%-1rem)] rounded-md hover:bg-red-900/40 transition-all cursor-pointer group text-left"
                            >
                                <div className="shrink-0 text-red-400">{item.icon}</div>
                                <span className={`transition-all duration-300 ${!isOpen && "hidden"}`}>
                                    {item.name}
                                </span>
                            </button>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
}

export default Sidebar;
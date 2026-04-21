// import React, { useState } from 'react';
// import { FaHome } from 'react-icons/fa';
// import { FiChevronRight } from 'react-icons/fi';
// import { IoIosCreate } from 'react-icons/io';
// import { LuLogOut } from 'react-icons/lu';
// import { TbLogs } from 'react-icons/tb';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout as logoutThunk } from '../redux/api/userSlice';
// import { toast } from 'react-toastify';

// function Sidebar() {
//     const [isOpen, setIsOpen] = useState(false);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const currentUser = useSelector((state) => state.user?.currentUser);

//     const logout = async () => {
//         const result = await dispatch(logoutThunk());
//         if (logoutThunk.fulfilled.match(result)) {
//             toast.success("Logged out");
//             navigate("/");
//         } else {
//             toast.error(result.payload?.message || "Logout failed");
//         }
//     };
    
//     const menuItems = [
//         { name: "Dashboard", icon: <FaHome size={20}/>, path: "/dashboard" },
//         { name: "My Posts", icon: <TbLogs size={20}/>, path: "/dashboard/posts" },
//         { name: "Create Post", icon: <IoIosCreate size={20}/>, path: "/dashboard/create-post" },
//         { name: "Logout", icon: <LuLogOut size={20}/>, action: logout },
//     ];

//     const isActive = (path) => {
//         if (path === '/dashboard') return location.pathname === '/dashboard' || location.pathname === '/dashboard/';
//         return location.pathname.startsWith(path);
//     };

//     return (
//         <div 
//             className={`h-screen bg-slate-950 sticky top-0 text-white transition-all duration-300 flex flex-col border-r border-slate-800/50 ${
//                 isOpen ? "w-64" : "w-[72px]"
//             }`}
//         >
//             {/* Toggle */}
//             <button 
//                 onClick={() => setIsOpen(!isOpen)} 
//                 className="absolute -right-3 top-[4.5rem] bg-slate-800 text-white p-1 rounded-full border border-slate-700 z-50 hover:bg-indigo-600 hover:border-indigo-500 transition-colors duration-200"
//             >
//                 <FiChevronRight 
//                     className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} 
//                 />
//             </button>

//             {/* Logo area */}
//             <div className="p-4 pt-5">
//                 <Link to="/" className="flex items-center gap-3 group">
//                     <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
//                         T
//                     </div>
//                     <span className={`font-bold text-lg tracking-tight transition-all duration-300 overflow-hidden whitespace-nowrap ${!isOpen ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
//                         Tech<span className="text-indigo-400">Blog</span>
//                     </span>
//                 </Link>
//             </div>

//             <div className="mx-4 border-b border-slate-800/80" />

//             {/* User info */}
//             {currentUser && (
//                 <div className={`mx-3 mt-4 p-3 rounded-xl bg-white/5 flex items-center gap-3 overflow-hidden transition-all duration-300 ${!isOpen ? 'justify-center' : ''}`}>
//                     <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm uppercase">
//                         {currentUser.username?.[0] || 'U'}
//                     </div>
//                     <div className={`min-w-0 transition-all duration-300 ${!isOpen ? 'hidden' : 'block'}`}>
//                         <p className="text-sm font-medium text-white truncate">{currentUser.username}</p>
//                         <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
//                     </div>
//                 </div>
//             )}

//             {/* Navigation */}
//             <nav className="mt-4 flex-1 px-2 space-y-1">
//                 {menuItems.map((item, index) => {
//                     if (item.path) {
//                         const active = isActive(item.path);
//                         return (
//                             <Link 
//                                 key={index}
//                                 to={item.path} 
//                                 className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
//                                     active
//                                         ? 'bg-indigo-500/15 text-indigo-400'
//                                         : 'text-slate-400 hover:text-white hover:bg-white/5'
//                                 } ${!isOpen ? 'justify-center' : ''}`}
//                                 title={!isOpen ? item.name : undefined}
//                             >
//                                 <div className={`shrink-0 ${active ? 'text-indigo-400' : ''}`}>{item.icon}</div>
//                                 <span className={`text-sm font-medium transition-all duration-300 overflow-hidden whitespace-nowrap ${!isOpen ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
//                                     {item.name}
//                                 </span>
//                             </Link>
//                         );
//                     }
//                     return (
//                         <button 
//                             key={index}
//                             onClick={item.action}
//                             className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group ${!isOpen ? 'justify-center' : ''}`}
//                             title={!isOpen ? item.name : undefined}
//                         >
//                             <div className="shrink-0 text-red-400/70 group-hover:text-red-400">{item.icon}</div>
//                             <span className={`text-sm font-medium transition-all duration-300 overflow-hidden whitespace-nowrap ${!isOpen ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
//                                 {item.name}
//                             </span>
//                         </button>
//                     );
//                 })}
//             </nav>

//             {/* Bottom branding */}
//             <div className={`p-4 text-xs text-slate-600 transition-all duration-300 ${!isOpen ? 'hidden' : 'block'}`}>
//                 © {new Date().getFullYear()} TechBlog
//             </div>
//         </div>
//     );
// }

// export default Sidebar;









import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { IoIosCreate } from 'react-icons/io';
import { LuLogOut } from 'react-icons/lu';
import { TbLogs, TbLayoutDashboard } from 'react-icons/tb';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutThunk } from '../redux/api/userSlice';
import { toast } from 'react-toastify';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = useSelector((state) => state.user?.currentUser);

    const logout = async () => {
        const result = await dispatch(logoutThunk());
        if (logoutThunk.fulfilled.match(result)) {
            toast.success("Logged out successfully");
            navigate("/");
        } else {
            toast.error(result.payload?.message || "Logout failed");
        }
    };
    
    const menuItems = [
        { name: "Overview", icon: <TbLayoutDashboard size={20}/>, path: "/dashboard" },
        { name: "My Posts", icon: <TbLogs size={20}/>, path: "/dashboard/posts" },
        { name: "Create Post", icon: <IoIosCreate size={20}/>, path: "/dashboard/create-post" },
        { name: "Logout", icon: <LuLogOut size={20}/>, action: logout, danger: true },
    ];

    const isActive = (path) => {
        if (path === '/dashboard') return location.pathname === '/dashboard' || location.pathname === '/dashboard/';
        return location.pathname.startsWith(path);
    };

    return (
        <aside 
            className={`h-screen sticky top-0 bg-slate-950 border-r border-white/5 transition-all duration-500 ease-in-out flex flex-col z-[100] ${
                isOpen ? "w-72" : "w-[88px]"
            }`}
        >
            {/* Floating Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="absolute -right-4 top-10 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/40 hover:bg-indigo-500 transition-all z-[110]"
            >
                <FiChevronRight 
                    className={`w-5 h-5 transition-transform duration-500 ${isOpen ? "rotate-180" : "rotate-0"}`} 
                />
            </button>

            {/* Logo Area */}
            <div className="p-6 mb-2">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-11 h-11 shrink-0 rounded-2xl bg-white flex items-center justify-center text-slate-950 font-black text-xl shadow-[0_0_20px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-all">
                        T
                    </div>
                    <div className={`transition-all duration-500 overflow-hidden ${!isOpen ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                        <span className="text-xl font-black text-white tracking-tighter">
                            Tech<span className="text-indigo-500">.</span>
                        </span>
                    </div>
                </Link>
            </div>

            {/* User Profile Card */}
            {currentUser && (
                <div className="px-4 mb-6">
                    <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 transition-all duration-500 ${!isOpen ? 'justify-center bg-transparent border-none' : ''}`}>
                        <div className="relative shrink-0">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black shadow-lg">
                                {currentUser.username?.[0].toUpperCase()}
                            </div>
                            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-4 border-slate-950 rounded-full"></span>
                        </div>
                        <div className={`min-w-0 transition-opacity duration-300 ${!isOpen ? 'hidden' : 'block'}`}>
                            <p className="text-sm font-black text-white truncate uppercase tracking-tighter">{currentUser.username}</p>
                            <p className="text-[10px] font-bold text-slate-500 truncate uppercase tracking-widest">Administrator</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Menu */}
            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item, index) => {
                    const active = item.path ? isActive(item.path) : false;
                    
                    const content = (
                        <>
                            <div className={`shrink-0 transition-colors duration-300 ${
                                active ? 'text-white' : item.danger ? 'text-red-400/70 group-hover:text-red-400' : 'text-slate-400 group-hover:text-white'
                            }`}>
                                {item.icon}
                            </div>
                            <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${!isOpen ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                                {item.name}
                            </span>
                            {active && isOpen && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"></div>
                            )}
                        </>
                    );

                    if (item.path) {
                        return (
                            <Link 
                                key={index}
                                to={item.path} 
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative ${
                                    active
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                } ${!isOpen ? 'justify-center px-0' : ''}`}
                                title={!isOpen ? item.name : undefined}
                            >
                                {content}
                            </Link>
                        );
                    }
                    
                    return (
                        <button 
                            key={index}
                            onClick={item.action}
                            className={`flex items-center gap-4 px-4 py-3.5 w-full rounded-2xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group ${!isOpen ? 'justify-center px-0' : ''}`}
                            title={!isOpen ? item.name : undefined}
                        >
                            {content}
                        </button>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-6 mt-auto">
                <div className={`flex items-center gap-3 p-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 transition-all ${!isOpen ? 'justify-center bg-transparent border-none' : ''}`}>
                    <FaHome className="text-indigo-500 shrink-0" size={18} />
                    <div className={`${!isOpen ? 'hidden' : 'block'}`}>
                        <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Version 2.0</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
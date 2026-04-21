import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RiCloseLargeFill } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const currentUser = useSelector((state) => state.user?.currentUser);
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };
// bg-slate-950/70 
    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/blogs', label: 'Blogs' },
        { to: '/contact', label: 'Contact' },
    ];

    return (
        <nav className='sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl'>
            <div className='flex justify-between items-center mx-auto container px-4 h-16'>
                {/* Logo */}
                <Link to="/" className='flex items-center gap-2 group'>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
                        T
                    </div>
                    <span className='text-xl font-bold text-white tracking-tight'>
                        Tech<span className="text-indigo-400">Blog</span>
                    </span>
                </Link>

                {/* Desktop nav */}
                <ul className='hidden md:flex items-center gap-1'>
                    {navLinks.map(link => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive(link.to)
                                        ? 'bg-white/10 text-white'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    {!currentUser && (
                        <li className="ml-2">
                            <Link
                                to="/signin"
                                className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            >
                                Sign in
                            </Link>
                        </li>
                    )}
                    {currentUser && (
                        <li className="ml-2">
                            <Link
                                to="/dashboard"
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive('/dashboard')
                                        ? 'bg-indigo-500/20 text-indigo-300'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                    {currentUser.username?.[0] || 'U'}
                                </div>
                                Dashboard
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Mobile toggle */}
                <button
                    className='md:hidden p-2 rounded-lg hover:bg-white/10 text-white transition-colors'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen
                        ? <RiCloseLargeFill size={20} />
                        : <GiHamburgerMenu size={20} />
                    }
                </button>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className='px-4 pb-4 space-y-1'>
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsMenuOpen(false)}
                            className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                isActive(link.to)
                                    ? 'bg-white/10 text-white'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {!currentUser && (
                        <Link
                            to="/signin"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-3 rounded-xl text-sm font-semibold text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white mt-2"
                        >
                            Sign in
                        </Link>
                    )}
                    {currentUser && (
                        <Link
                            to="/dashboard"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-3 rounded-xl text-sm font-medium text-indigo-300 hover:bg-white/5 transition-colors"
                        >
                            Dashboard
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar


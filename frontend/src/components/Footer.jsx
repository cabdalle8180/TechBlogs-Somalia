// import { Link } from 'react-router-dom';
// import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
// import { HiOutlineMail } from 'react-icons/hi';

// function Footer() {
//   return (
//     <footer className="relative mt-auto border-t border-slate-800/50 bg-slate-950 text-slate-400 overflow-hidden">
//       {/* Subtle gradient glow */}
//       <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

//       <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        
//         {/* Brand */}
//         <div className="sm:col-span-2 lg:col-span-1">
//           <Link to="/" className="flex items-center gap-2 mb-3 group">
//             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
//               T
//             </div>
//             <span className="text-lg font-bold text-white tracking-tight">
//               Tech<span className="text-indigo-400">Blog</span>
//             </span>
//           </Link>
//           <p className="text-sm leading-relaxed max-w-xs">
//             A modern platform for developers and tech enthusiasts to share knowledge, ideas, and insights.
//           </p>
//           {/* Social icons */}
//           <div className="flex items-center gap-3 mt-4">
//             <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-indigo-500/20 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all duration-200" aria-label="Twitter">
//               <FaTwitter size={16} />
//             </a>
//             <a href="https://github.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-indigo-500/20 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all duration-200" aria-label="GitHub">
//               <FaGithub size={16} />
//             </a>
//             <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-indigo-500/20 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all duration-200" aria-label="LinkedIn">
//               <FaLinkedin size={16} />
//             </a>
//             <a href="mailto:hello@techblog.com" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-indigo-500/20 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all duration-200" aria-label="Email">
//               <HiOutlineMail size={16} />
//             </a>
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Navigate</h3>
//           <ul className="space-y-2.5 text-sm">
//             <li>
//               <Link to="/" className="hover:text-indigo-400 transition-colors duration-200">Home</Link>
//             </li>
//             <li>
//               <Link to="/blogs" className="hover:text-indigo-400 transition-colors duration-200">Blogs</Link>
//             </li>
//             <li>
//               <Link to="/contact" className="hover:text-indigo-400 transition-colors duration-200">Contact</Link>
//             </li>
//             <li>
//               <Link to="/dashboard" className="hover:text-indigo-400 transition-colors duration-200">Dashboard</Link>
//             </li>
//           </ul>
//         </div>

//         {/* Resources */}
//         <div>
//           <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Resources</h3>
//           <ul className="space-y-2.5 text-sm">
//             <li>
//               <Link to="/blogs" className="hover:text-indigo-400 transition-colors duration-200">Latest Articles</Link>
//             </li>
//             <li>
//               <Link to="/signup" className="hover:text-indigo-400 transition-colors duration-200">Become a Writer</Link>
//             </li>
//             <li>
//               <a href="#" className="hover:text-indigo-400 transition-colors duration-200">RSS Feed</a>
//             </li>
//           </ul>
//         </div>

//         {/* Legal */}
//         <div>
//           <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Legal</h3>
//           <ul className="space-y-2.5 text-sm">
//             <li>
//               <a href="#" className="hover:text-indigo-400 transition-colors duration-200">Privacy Policy</a>
//             </li>
//             <li>
//               <a href="#" className="hover:text-indigo-400 transition-colors duration-200">Terms of Service</a>
//             </li>
//             <li>
//               <a href="#" className="hover:text-indigo-400 transition-colors duration-200">Cookie Policy</a>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Bottom bar */}
//       <div className="border-t border-slate-800/50 py-5 px-4">
//         <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
//           <p>© {new Date().getFullYear()} TechBlog. All rights reserved.</p>
//           <p>Built with ❤️ for the developer community</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;













import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { TbArrowUpRight, TbBolt } from 'react-icons/tb';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-white/5 bg-slate-950 text-slate-400 overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand & Mission (Spans 4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-950 font-black text-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:rotate-6 transition-transform">
                T
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">
                Tech<span className="text-indigo-500">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Waxaan dhisaynaa mustaqbalka tignoolajiyada. TechBlog waa hooyga aqoonta, hal-abuurka, iyo wadaagista fikradaha casriga ah ee horumariyayaasha Soomaaliyeed.
            </p>
            {/* Social Pill */}
            <div className="flex items-center gap-2 pt-2">
              {[
                { icon: <FaTwitter />, link: "#" },
                { icon: <FaGithub />, link: "#" },
                { icon: <FaLinkedin />, link: "#" },
                { icon: <HiOutlineMail size={18} />, link: "mailto:hello@techblog.com" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.link} 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections (Spans 8 columns) */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="space-y-5">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Navigate</h3>
              <ul className="space-y-3 text-sm">
                {['Home', 'Blogs', 'Contact', 'Dashboard'].map((item) => (
                  <li key={item}>
                    <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="group flex items-center gap-1 hover:text-white transition-colors">
                      {item} <TbArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-5">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Resources</h3>
              <ul className="space-y-3 text-sm">
                {['Latest Articles', 'Become a Writer', 'Tech Community', 'Open Source'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 (Newsletter Style) */}
            <div className="col-span-2 md:col-span-1 space-y-5">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Stay Updated</h3>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Email-kaaga..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all"
                />
                <button className="absolute right-2 top-2 p-1.5 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 transition-colors">
                  <TbBolt size={18} />
                </button>
              </div>
              <p className="text-[10px] text-slate-500 italic">Ku biir 2,000+ horumariyayaal ah.</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] font-medium tracking-widest uppercase text-slate-500">
            © {currentYear} TechBlog Studio. Crafted with precision.
          </div>
          
          <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
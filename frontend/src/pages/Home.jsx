// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { stripHtml } from "../lib/sanitizeHtml";

// function Home() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ Fetch posts
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await fetch("/api/posts");
//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data?.message || "Failed to load posts");
//         }

//         // ✅ Handle API format (array or {posts: []})
//         const postsData = Array.isArray(data)
//           ? data
//           : data.posts || [];

//         setPosts(postsData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // ✅ Sort posts (latest first)
//   const sortedPosts = useMemo(() => {
//     return [...posts].sort(
//       (a, b) =>
//         new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
//     );
//   }, [posts]);

//   const hero = sortedPosts[0];
//   const rest = sortedPosts.slice(1);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
//           Tech Blog
//         </h1>
//         <p className="mt-2 text-slate-600">
//           Read the latest posts from the community.
//         </p>
//       </div>

//       {/* Loading */}
//       {loading && (
//         <p className="text-slate-600 animate-pulse">
//           Loading posts...
//         </p>
//       )}

//       {/* Error */}
//       {error && (
//         <p className="text-red-600">
//           {error}
//         </p>
//       )}

//       {/* Empty */}
//       {!loading && !error && posts.length === 0 && (
//         <p className="text-slate-600">No posts yet.</p>
//       )}

//       {/* Hero Post */}
//       {!loading && !error && hero && (
//         <Link
//           to={`/blogs/${hero._id}`}
//           className="block rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition"
//         >
//           <div className="grid md:grid-cols-2">
//             <div className="bg-slate-100">
//               <img
//                 src={hero.image || "https://placehold.co/1200x800?text=Tech+Blog"}
//                 alt={hero.title}
//                 className="w-full h-64 md:h-full object-cover"
//                 loading="lazy"
//               />
//             </div>

//             <div className="p-6 md:p-8">
//               <p className="text-xs uppercase text-slate-500">
//                 Latest post
//               </p>

//               <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-slate-900 line-clamp-2">
//                 {hero.title}
//               </h2>

//               {hero.category && (
//                 <p className="mt-2 text-xs uppercase text-slate-500">
//                   {hero.category}
//                 </p>
//               )}

//               <p className="mt-3 text-slate-600 line-clamp-4">
//                 {stripHtml(hero.content || "")}
//               </p>

//               <div className="mt-6 text-blue-600 font-medium">
//                 Read more →
//               </div>
//             </div>
//           </div>
//         </Link>
//       )}

//       {/* Other Posts */}
//       {!loading && !error && rest.length > 0 && (
//         <div className="mt-10">
//           <h3 className="text-lg font-semibold text-slate-900 mb-4">
//             More recent
//           </h3>

//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             {rest.map((p) => (
//               <Link
//                 key={p._id}
//                 to={`/blogs/${p._id}`}
//                 className="rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition bg-white"
//               >
//                 <img
//                   src={p.image || "https://placehold.co/800x500?text=Post"}
//                   alt={p.title}
//                   className="w-full h-40 object-cover"
//                   loading="lazy"
//                 />

//                 <div className="p-4">
//                   <h4 className="font-semibold text-slate-900 line-clamp-2">
//                     {p.title}
//                   </h4>

//                   {p.category && (
//                     <p className="mt-1 text-xs uppercase text-slate-500">
//                       {p.category}
//                     </p>
//                   )}

//                   <p className="mt-2 text-sm text-slate-600 line-clamp-3">
//                     {stripHtml(p.content || "")}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;



















import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { stripHtml } from "../lib/sanitizeHtml";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/posts");
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to load posts");
        const postsData = Array.isArray(data) ? data : data.posts || [];
        setPosts(postsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }, [posts]);

  const hero = sortedPosts[0];
  const rest = sortedPosts.slice(1);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Tech <span className="text-indigo-600">Insight</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Halkaan ka hel xogta ugu dambeysay ee tignoolajiyada, horumarinta web-ka, iyo hal-abuurka community-ga.
            </p>
          </div>
          <div className="h-1 w-20 bg-indigo-600 rounded-full hidden md:block mb-2"></div>
        </div>

        {error && (
          <div className="p-4 mb-8 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">
            {error}
          </div>
        )}

        {/* Hero Post */}
        {!error && hero && (
          <Link to={`/blogs/${hero._id}`} className="group relative block mb-16">
            <div className="relative h-[500px] w-full overflow-hidden rounded-[2rem] shadow-2xl">
              <img
                src={hero.image || "https://placehold.co/1200x800?text=Premium+Tech"}
                alt={hero.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <span className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                  {hero.category || "Featured"}
                </span>
                <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl">
                  {hero.title}
                </h2>
                <p className="mt-4 text-slate-200 line-clamp-2 max-w-2xl text-lg">
                  {stripHtml(hero.content || "")}
                </p>
                <div className="mt-6 flex items-center gap-2 text-indigo-400 font-semibold group-hover:gap-4 transition-all">
                  Read Full Article <span className="text-xl">→</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Other Posts Grid */}
        {!error && rest.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl font-bold text-slate-900">Recent Stories</h3>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <Link
                  key={p._id}
                  to={`/blogs/${p._id}`}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={p.image || "https://placehold.co/800x500?text=Tech"}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {p.category && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold uppercase text-indigo-600 shadow-sm">
                        {p.category}
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {p.title}
                    </h4>
                    <p className="mt-3 text-slate-500 text-sm line-clamp-3 leading-relaxed">
                      {stripHtml(p.content || "")}
                    </p>
                    <div className="mt-auto pt-6 flex items-center justify-between">
                       <span className="text-xs font-medium text-slate-400">
                         {new Date(p.createdAt).toLocaleDateString('so-SO', { month: 'short', day: 'numeric' })}
                       </span>
                       <span className="text-indigo-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                         Read More
                       </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
            <p className="text-xl text-slate-400">Weli ma jiraan wax maqaal ah.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
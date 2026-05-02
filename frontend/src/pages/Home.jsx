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
      {/* 
          CABIRKA AAD CODSATAY: 
          px-4 (Mobile), sm:px-10 (Tablet), lg:px-20 (Desktop-ka weyn)
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 py-12 lg:py-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Tech <span className="text-indigo-600">Insight</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl">
              Find the latest information on technology, web development, and community innovation here.
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
          <Link to={`/blogs/${hero._id}`} className="group relative block mb-12 md:mb-16">
            <div className="relative h-[350px] md:h-[500px] w-full overflow-hidden rounded-2xl md:rounded-[2rem] shadow-2xl">
              <img
                src={hero.image || "https://placehold.co/1200x800?text=Premium+Tech"}
                alt={hero.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
                <span className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full">
                  {hero.category || "Featured"}
                </span>
                <h2 className="mt-4 text-2xl md:text-5xl font-bold text-white leading-tight max-w-3xl">
                  {hero.title}
                </h2>
                <p className="mt-4 text-slate-200 line-clamp-2 max-w-2xl text-sm md:text-lg hidden sm:block">
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
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">Recent Stories</h3>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <Link
                  key={p._id}
                  to={`/blogs/${p._id}`}
                  className="group flex flex-col bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="relative h-48 md:h-56 overflow-hidden">
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
                    <h4 className="text-lg md:text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {p.title}
                    </h4>
                    <p className="mt-3 text-slate-500 text-sm line-clamp-3 leading-relaxed">
                      {stripHtml(p.content || "")}
                    </p>
                    <div className="mt-auto pt-6 flex items-center justify-between">
                       <span className="text-xs font-medium text-slate-400">
                         {new Date(p.createdAt).toLocaleDateString('so-SO', { month: 'short', day: 'numeric' })}
                       </span>
                       <span className="text-indigo-600 text-sm font-bold opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
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
          <div className="text-center py-20 bg-white rounded-2xl md:rounded-[2rem] border-2 border-dashed border-slate-200">
            <p className="text-lg md:text-xl text-slate-400">Weli ma jiraan wax maqaal ah.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { sanitizeHtml } from "../lib/sanitizeHtml";

// function BlogPost() {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let cancelled = false;
//     async function load() {
//       try {
//         setLoading(true);
//         setError(null);
//         const res = await fetch(`/api/posts/${id}`);
//         const data = await res.json();
//         if (!res.ok) throw new Error(data?.message || "Failed to load post");
//         if (!cancelled) setPost(data?.post || null);
//       } catch (e) {
//         if (!cancelled) setError(e?.message || "Failed to load post");
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }
//     if (id) load();
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   if (loading) return <div className="max-w-3xl mx-auto px-4 py-8 text-slate-600">Loading…</div>;
//   if (error) return <div className="max-w-3xl mx-auto px-4 py-8 text-red-600">{error}</div>;
//   if (!post) return <div className="max-w-3xl mx-auto px-4 py-8 text-slate-600">Post not found.</div>;

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       <Link to="/blogs" className="text-sm text-blue-600 font-medium">← Back to Blogs</Link>

//       <h1 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">{post.title}</h1>
//       {post.category && (
//         <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">{post.category}</p>
//       )}
//       {post.author?.username && (
//         <p className="mt-2 text-sm text-slate-500">By {post.author.username}</p>
//       )}

//       <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
//         <img
//           src={post.image || "https://placehold.co/1200x700?text=Tech+Blog"}
//           alt={post.title}
//           className="w-full max-h-[420px] object-cover"
//           loading="lazy"
//         />
//       </div>

//       <article className="prose prose-slate max-w-none mt-6">
//         <div
//           dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
//         />
//       </article>
//     </div>
//   );
// }

// export default BlogPost;













import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { sanitizeHtml } from "../lib/sanitizeHtml";

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to load post");
        if (!cancelled) setPost(data?.post || null);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load post");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (id) load();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
      <p className="text-slate-500 font-medium italic">Soo dejinta maqaalka...</p>
    </div>
  );

  if (error) return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100">
        <p className="text-lg font-semibold mb-2">Oops! Waxbaa khaldamay</p>
        <p>{error}</p>
        <Link to="/" className="mt-4 inline-block text-indigo-600 underline">Ku laabo bogga hore</Link>
      </div>
    </div>
  );

  if (!post) return <div className="max-w-3xl mx-auto px-4 py-20 text-center text-slate-500">Maqaalkan lama helin.</div>;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Top Progress Bar (Optional) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-100 z-50">
        <div className="h-full bg-indigo-600 w-1/3"></div> {/* Tan waxaad ku xiri kartaa scroll scroll */}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Ku laabo Maqaallada
        </Link>

        {/* Header Section */}
        <header className="mt-8 text-center md:text-left">
          {post.category && (
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-md mb-4">
              {post.category}
            </span>
          )}
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            {post.title}
          </h1>

          {/* Author & Date Info */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between border-y border-slate-100 py-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {post.author?.username?.[0].toUpperCase() || "T"}
              </div>
              <div className="text-left">
                <p className="text-slate-900 font-bold leading-none">{post.author?.username || "TechBlog Writer"}</p>
                <p className="text-slate-400 text-xs mt-1">
                  Published · {new Date(post.createdAt).toLocaleDateString('so-SO', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-slate-400">
               {/* Halkan waxaad dhigi kartaa Social Share Icons hadhow */}
               <span className="text-xs italic">5 min read</span>
            </div>
          </div>
        </header>

        {/* Main Image */}
        <div className="mt-10 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/20">
            <img
              src={post.image || "https://placehold.co/1200x700?text=Tech+Insight"}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        </div>

        {/* Article Body */}
        <div className="mt-12 max-w-3xl mx-auto">
          <article className="prose prose-lg prose-slate prose-indigo max-w-none 
            prose-headings:font-bold prose-headings:text-slate-900
            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-lg
            prose-strong:text-slate-900 prose-blockquote:border-indigo-500
            prose-img:rounded-3xl prose-pre:bg-slate-900 prose-pre:shadow-xl">
            <div
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
            />
          </article>

          {/* Footer of the article */}
          <div className="mt-20 pt-10 border-t border-slate-100">
            <div className="bg-slate-50 rounded-3xl p-8 flex items-center gap-6">
               <div className="flex-1">
                  <h4 className="font-bold text-slate-900">Waad ku mahadsantahay akhriskaaga!</h4>
                  <p className="text-slate-500 text-sm mt-1">Haddii aad ka heshay maqaalkan, fadlan la wadaag asxaabtaada si ay wax uga bartaan.</p>
               </div>
               <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                  Share Post
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
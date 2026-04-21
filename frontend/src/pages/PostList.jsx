import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import { TbEdit, TbTrash, TbPlus } from "react-icons/tb";

function PostList() {
  const currentUser = useSelector((state) => state.user?.currentUser);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!currentUser?.username) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/posts/user/${currentUser.username}`, { credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to fetch posts");
        setPosts(Array.isArray(data) ? data : data.posts || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentUser]);

  const handleDeletePost = async (id) => {
    if (!window.confirm("Ma hubtaa inaad tirtirto maqaalkan?")) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Tirtiristu way fashilantay");
      setPosts((prev) => prev.filter((post) => post._id !== id));
      toast.success("Maqaalkii waa la tirtiray");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }, [posts]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Maamulka <span className="text-indigo-600">Maqaallada</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Waxaad halkan ku maamuli kartaa dhamaan maqaallada aad qortay.</p>
        </div>
        <Link 
          to="/dashboard/create-post" 
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200"
        >
          <TbPlus size={20} /> New Post
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100 italic">
          {error}
        </div>
      )}

      {/* Posts Container */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        {sortedPosts.length === 0 ? (
          <div className="p-20 text-center text-slate-400 italic">
            Weli ma jiraan wax maqaal ah oo aad qortay.
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {sortedPosts.map((post) => (
              <div 
                key={post._id} 
                className="group flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 hover:bg-slate-50/80 transition-colors"
              >
                {/* Post Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="hidden md:flex w-12 h-12 shrink-0 rounded-2xl bg-indigo-50 items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    {post.title[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">
                        {post.category || "General"}
                      </span>
                      <span className="text-xs text-slate-400">
                        {moment(post.createdAt).format("MMM DD, YYYY")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 md:mt-0 ml-0 md:ml-6">
                  <Link
                    to={`/dashboard/edit-post/${post._id}`}
                    className="p-2.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                    title="Edit Post"
                  >
                    <TbEdit size={22} />
                  </Link>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="p-2.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                    title="Delete Post"
                  >
                    <TbTrash size={22} />
                  </button>
                  <Link 
                    to={`/blogs/${post._id}`}
                    className="ml-2 text-xs font-bold text-indigo-600 hover:underline"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-center">
        <p className="text-xs text-slate-400">Total Posts: {posts.length}</p>
      </div>
    </div>
  );
}

export default PostList;
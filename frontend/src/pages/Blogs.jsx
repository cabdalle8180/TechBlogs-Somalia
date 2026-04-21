import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { stripHtml } from "../lib/sanitizeHtml";

function Blogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams();
        if (q.trim()) params.set("q", q.trim());
        if (category.trim()) params.set("category", category.trim());
        const url = params.toString() ? `/api/posts?${params.toString()}` : "/api/posts";
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to load posts");
        if (!cancelled) setPosts(data?.posts || []);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load posts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [q, category]);

  const categories = useMemo(() => {
    const set = new Set();
    for (const p of posts) {
      if (p?.category) set.add(p.category);
    }
    return Array.from(set).sort();
  }, [posts]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Blogs</h1>
          <p className="mt-1 text-slate-600">All published posts.</p>
        </div>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-slate-700">Search</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title, content, category…"
            className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md focus:border-slate-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md focus:border-slate-500 bg-white"
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="text-slate-600">Loading…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="text-slate-600">No posts found.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p._id}
            to={`/blogs/${p._id}`}
            className="rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition bg-white"
          >
            <img
              src={p.image || "https://placehold.co/800x500?text=Post"}
              alt={p.title}
              className="w-full h-44 object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <h3 className="font-semibold text-slate-900 line-clamp-2">{p.title}</h3>
              {p.category && <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{p.category}</p>}
              <p className="mt-2 text-sm text-slate-600 line-clamp-3">{stripHtml(p.content)}</p>
              <div className="mt-3 text-sm text-blue-600 font-medium">Read more →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
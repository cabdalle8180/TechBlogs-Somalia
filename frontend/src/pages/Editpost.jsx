import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import RichTextEditor from "../components/RichTextEditor";
import { TbUpload } from "react-icons/tb";

function Editpost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInput = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`/api/posts/${id}`, { credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to load post");
        const p = data?.post;
        if (!cancelled && p) {
          setFormData({
            title: p.title || "",
            category: p.category || "",
            content: p.content || "",
            image: "",
          });
          setPreview(p.image || "");
        }
      } catch (e) {
        if (!cancelled) toast.error(e?.message || "Failed to load post");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (id) load();
    return () => { cancelled = true; };
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setFormData((p) => ({ ...p, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.content) {
      return toast.error("Title, Category, and Content are required");
    }
    try {
      setSaving(true);
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to update post");
      toast.success("Post updated successfully");
      navigate("/dashboard/posts");
    } catch (e) {
      toast.error(e?.message || "Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-slate-500 font-mono">Loading post...</div>;
  }

  return (
    <div className='max-w-3xl font-mono text-slate-800 bg-white p-4 md:p-8 min-h-screen'>
      <div className='mb-10'>
        <h1 className='text-[22px] font-bold text-[#415579] tracking-wide mb-2'>Edit Post</h1>
        <p className='text-[13px] text-slate-500'>Update your blog post details below.</p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className='block text-[15px] font-bold text-slate-800'>
            Title
          </label>
          <input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
            placeholder='e.g., The Future of AI'
            type="text"
            className='w-full text-[14px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-[#415579] focus:bg-white focus:outline-none transition-all'
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label htmlFor="category" className='block text-[15px] font-bold text-slate-800'>
            Category
          </label>
          <input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
            placeholder="e.g., Technology"
            type="text"
            className='w-full text-[14px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-[#415579] focus:bg-white focus:outline-none transition-all'
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label htmlFor="content" className='block text-[15px] font-bold text-slate-800'>
            Content
          </label>
          <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50 focus-within:border-[#415579] focus-within:bg-white transition-all">
            <RichTextEditor
              value={formData.content}
              onChange={(html) => setFormData((p) => ({ ...p, content: html }))}
            />
          </div>
        </div>

        {/* Featured Image */}
        <div className="space-y-2">
          <label className='block text-[15px] font-bold text-slate-800'>
            Featured Image (Optional)
          </label>
          <input
            ref={fileInput}
            onChange={handleImageChange}
            type="file"
            id='file'
            accept='image/*'
            className='hidden'
          />
          <div 
            onClick={() => fileInput.current?.click()}
            className={`w-full relative border-2 border-dashed ${preview ? 'border-transparent' : 'border-slate-300'} rounded-lg overflow-hidden cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-center min-h-[200px]`}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className='w-full h-[300px] object-cover'
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-500">
                <TbUpload size={32} />
                <span className="text-sm">Click to upload image</span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            disabled={saving}
            type="submit"
            className="px-8 py-3 rounded-lg bg-[#415579] text-white font-bold text-[14px] hover:bg-[#2c3d5a] transition-colors disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Editpost;
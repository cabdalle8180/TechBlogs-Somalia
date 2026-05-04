import { useRef, useState } from 'react';
import API_BASE from '../lib/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RichTextEditor from '../components/RichTextEditor';
import { TbUpload, TbArrowLeft, TbCircleCheck } from 'react-icons/tb';

function CreatePost() {
  const fileInput = useRef(null);
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB Limit example
        return toast.error("Image must be smaller than 2MB");
      }
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
      }
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.content) {
      return toast.error("Please fill all required fields (Title, Category, Content)");
    }
    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/posts/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to create post");
      toast.success("Post published successfully!");
      navigate("/dashboard/posts");
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-4 md:p-10 min-h-screen bg-slate-50/30'>
      {/* Header with Back Button */}
      <div className='mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-4 text-sm font-medium"
          >
            <TbArrowLeft size={18} /> Back to Dashboard
          </button>
          <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3'>
             Write a New Post <span className="text-indigo-600">✍️</span>
          </h1>
          <p className='text-slate-500 mt-2'>Share your knowledge and ideas with the world.</p>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-8" onSubmit={handleSubmit}>
        
        {/* Left Side: Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className='block text-sm font-bold text-slate-700 ml-1'>
                Post Title
              </label>
              <input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                placeholder='Example: How to learn React in 2026...'
                type="text"
                className='w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 focus:bg-white outline-none transition-all text-lg font-medium'
              />
            </div>

            {/* Content Editor */}
            <div className="space-y-2">
              <label className='block text-sm font-bold text-slate-700 ml-1'>
                Post Content
              </label>
              <div className="rounded-2xl border border-slate-100 overflow-hidden focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
                <RichTextEditor
                  value={formData.content}
                  onChange={(html) => setFormData((p) => ({ ...p, content: html }))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Options & Image */}
        <div className="space-y-6">
          {/* Settings Box */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
             {/* Category */}
             <div className="space-y-2">
              <label htmlFor="category" className='block text-sm font-bold text-slate-700 ml-1'>
                Category
              </label>
              <input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                placeholder="Example: Technology"
                type="text"
                className='w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-indigo-500 focus:bg-white outline-none transition-all'
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className='block text-sm font-bold text-slate-700 ml-1'>
                Post Image
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
                className={`group relative aspect-square border-2 border-dashed ${preview ? 'border-indigo-500' : 'border-slate-200'} rounded-2xl overflow-hidden cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all flex flex-col items-center justify-center`}
              >
                {preview ? (
                  <>
                    <img src={preview} alt="Preview" className='w-full h-full object-cover' />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                       Change Image
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-indigo-500 transition-colors">
                    <TbUpload size={40} strokeWidth={1.5} />
                    <span className="text-[13px] font-medium">Upload Image</span>
                  </div>
                )}
              </div>
            </div>

            {/* Publish Button */}
            <button
              disabled={submitting}
              onClick={handleSubmit}
              type="submit"
              className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                <> Publish Post <TbCircleCheck size={20} /> </>
              )}
            </button>
          </div>

          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-1">Tip:</h4>
            <p className="text-[11px] text-indigo-600 leading-relaxed">
              Make sure your image is high quality (High Resolution) to attract more readers.
            </p>
          </div>
        </div>

      </form>
    </div>
  );
}

export default CreatePost;
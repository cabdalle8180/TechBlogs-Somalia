import React, { useEffect, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { FaEdit } from 'react-icons/fa'
import { TbTrash } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { toast } from 'react-toastify'

function PostList() {
  const currentUser = useSelector((state) => state.currentUser);
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(true); // Added a proper loading state

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/user/${currentUser.username}`);
        const data = await res.json();
        setposts(data.posts || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser?.username) {
      fetchPost();
    }
  }, [currentUser]);

  const handleDeletePost = async (id) => {
    if (window.confirm("Ma hubtaa inaad tirtirto boostadan?")) {
      try {
        // const res = await fetch(`/api/posts/${id}`, {
        //   method: "DELETE"
        // });
        const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });

        if (res.ok) {
          // Update state to remove post immediately
          setposts((prev) => prev.filter((post) => post._id !== id));
          toast.success("Waala tirtirey Boostada");
        } else {
          toast.error("Wuu fashilmay tirtirista boostada.");
        }
      } catch (error) {
        console.error("DELETE Post Error:", error);
        toast.error("Khalad ayaa dhacay.");
      }
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (posts.length === 0) return <p className="p-4">No posts found.</p>;

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold text-slate-800 hidden md:block'>Posts</h1>
      {posts.map((post) => (
        <div key={post._id} className='p-4 hover:bg-slate-50 border-blue-900 transition-colors border-r border-l flex gap-4 items-center justify-between shadow-sm'>
          <div className='flex-1'>
            <h3 className='text-xl font-semibold'>{post.title}</h3>
            {/* Corrected moment format: DD-MM-YYYY */}
            <p className='text-slate-500'>Published on {moment(post.createdAt).format("DD-MM-YYYY")}</p>
          </div>

          {/* Desktop Actions */}
          <div className='hidden md:flex gap-2'>
            <Link to={`/dashboard/edit-post/${post._id}`} className='p-2 hover:bg-gray-200 transition-colors rounded'>
              <FaEdit className='text-slate-600' />
            </Link>
            <button onClick={() => handleDeletePost(post._id)} className='p-2 hover:bg-gray-200 transition-colors rounded'>
              <TbTrash className='text-red-600' />
            </button>
          </div>

          {/* Mobile Actions */}
          <div className='md:hidden relative group'>
            <button className='p-1 hover:bg-gray-200 rounded-full transition-colors'>
              <BiDotsVerticalRounded size={24} />
            </button>
            <div className='hidden group-hover:flex flex-col absolute right-0 top-8 bg-white shadow-lg rounded-lg p-2 border border-slate-300 z-10 w-32'>
              <Link to={`/dashboard/edit-post/${post._id}`} className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md">
                <FaEdit />
                <span>Edit</span>
              </Link>
              <button onClick={() => handleDeletePost(post._id)} className="flex items-center gap-2 p-2 hover:bg-gray-200 text-red-500 rounded-md">
                <TbTrash />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostList;
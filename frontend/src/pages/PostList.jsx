import React, { useEffect, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { FaEdit } from 'react-icons/fa'
import { TbTrash } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
function PostList() {
  const currentUser = useSelector((state)=> state.currentUser);
  const [posts , setposts] = useState([])  
console.log(posts);

  useEffect(()=>{
    const fethpost = async ()=>{
      const res = await fetch(`/api/posts/user/${currentUser.username}`)
      const data= await res.json()
      setposts(data.posts || [])
    }
    fethpost()
  },[currentUser])
  if (posts.length <1 ) return <p>Loading</p>
  return (
    <div className='space-y-4'>
       <h1 className='text-2xl font-semibold text-slate-800 hidden md:block'>Posts</h1>
       {posts.map((post) =>(
<div className='space-y-4'>
        
        <div  className='p-4 hover:bg-slate-400 border-blue-900 transition-colors border-r border-l flex gap-4 items-center justify-between'>
          <div className='flex-1'>
            <h3 className='text-xl font-semibold'>{post.title} </h3>
            <p className='text-slate-500'>publish on {moment(post.createdAt).format("d-mm-yy")} </p>
          </div>
          {/* desktop  */}
          <div className='hidden md:flex gap-2'>
            <Link to={`/dashboard/edit-post/:id`} className='p-2 hover:bg-gray-200 transition-colors'>
            <FaEdit className='text-slate-600'/>
            </Link>
            <button className='p-2 hover:bg-gray-200 transition-colors'>
              <TbTrash className='text-red-900'/>
            </button>
          </div>
          {/* mobile */}
          <div className='md:hidden relative group'>
            <button className='p-1 hover:bg-gray-200  rounded-full transition-colors'>
              <BiDotsVerticalRounded size={24}/>
            </button>
            <div className='hidden group-hover:flex flex-col absolute right-0 top-8 bg-white shadow-lg rounded-lg p-2 border border-slate-300 gap-2 w-32'>
  
  <Link to={`/dashboard/edit-post/:id}`}>
    <div className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md cursor-pointer">
      <FaEdit />
      <span>Edit</span>
    </div>
  </Link>

  <button className="flex items-center gap-2 p-2 hover:bg-gray-200 text-red-500 rounded-md">
    <TbTrash />
    <span>Delete</span>
  </button>

</div>
          </div>
        </div>
       </div>
       ))}
       
    </div>
  )
}


export default PostList


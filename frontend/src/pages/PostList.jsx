import React from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { FaEdit } from 'react-icons/fa'
import { TbTrash } from 'react-icons/tb'
import { Link } from 'react-router-dom'

function PostList() {
  return (
    <div className='space-y-4'>
       <h1 className='text-2xl font-semibold text-slate-800 hidden md:block'>Posts</h1>

       <div className='space-y-4'>
        <div  className='p-4 hover:bg-slate-400 border-blue-900 transition-colors border-r border-l flex gap-4 items-center justify-between'>
          <div className='flex-1'>
            <h3 className='text-xl font-semibold'>post list </h3>
            <p className='text-slate-500'>publish on 10/10/2026</p>
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
    </div>
  )
}


export default PostList


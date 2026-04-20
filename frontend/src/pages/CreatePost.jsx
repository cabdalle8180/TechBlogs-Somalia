import React, { useRef, useState } from 'react'
function CreatePost() {
  const fileIput = useRef();
  const [image, setImage]= useState();
  const [formData, setFormData] = useState({
    image: "",
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.resualt)
        setFormData((prev) => ({...prev, image: reader.result}));

      }
      reader.readAsDataURL(file);
    }
  }
  return (
    <div className=' p-4 max-w-4xl mx-auto flex-1'> 
      <div className='mb-8 space-y-2'>
        <h2 className='text font-semibold text-slate-600 hidden md:block'>Your Blogs</h2>
        <p className='text-base text-slate-700'>Create a new  blogs post to share with your readers. </p>
      </div>
      {/* form */}
      <form action="" className="space-y-6">
        <div>
          <label htmlFor="title" className=' text-xl block font-medium text-gray-700 '>
            title:{" "}

          </label>
          <input placeholder='enter your Post`s title' type="text" className='w-full text-base px-4 py-2 border border-slate-300 rounded-md focus:border-slate-500' />
        </div>
        <div>
          <label htmlFor="Category" className=' text-xl block font-medium text-gray-700 '>
            Category:{" "}

          </label>
          <input placeholder='enter tecth , progarming.. cyberSec..' type="text" className='w-full text-base px-4 py-2 border border-slate-300 rounded-md focus:border-slate-500' />
        </div>

        <div>
          <label htmlFor="Category" className=' text-xl block font-medium text-gray-700 '>
            Category:{" "}

          </label>

          <input placeholder='enter tecth , progarming.. cyberSec..' ref={fileIput} onClick={handleImageChange} type="file" id='file' accept='image/*' 
          className='w-full text-base px-4 py-2 border border-slate-300 rounded-md focus:border-slate-500' />
          <img className='h-[300px]' onClick={()=> fileIput.current.click()} 
          
          src= {image ? image : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0y-unuLIhRBzLnkxcGouDlp73HTSi12ooiQ2peLayXA&s=10`} alt="" />
        </div>
      </form>
    </div>
  )
}

export default CreatePost



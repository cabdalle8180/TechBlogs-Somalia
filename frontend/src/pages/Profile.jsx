// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   TbUser,
//   TbMail,
//   TbSettings,
//   TbCameraPlus,
//   TbCircleCheck,
// } from "react-icons/tb";
// import { useDispatch } from "react-redux";
// import { getUserProfile } from "@/redux/api/userSlice";

// /**
//  * CLEAN PROFILE COMPONENT
//  */
// function Profile() {
//   const { currentUser } = useSelector((state) => state.user);

//   // SAFE USER (NO _doc, NO CRASH)
//   const user = currentUser || {};
// const dispatch = useDispatch();

// const [formData, setFormData] = useState({
//   username: user?.username || "",
//   email: user?.email || "",
// });

// const handleChange = (e) => {
//   setFormData({
//     ...formData,
//     [e.target.name]: e.target.value,
//   });
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   dispatch(updateUserProfile(formData));
// };


//   useEffect(()=>{
//     dispatch(getUserProfile());
//   },[dispatch])

//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div className="max-w-5xl mx-auto p-6">

//       {/* HEADER */}
//       <div className="relative bg-slate-900 rounded-[30px] p-8 border border-white/5 shadow-2xl overflow-hidden">

//         <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">

//           {/* AVATAR */}
//           <div
//             className="relative"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//           >
//             <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-slate-900">
//               {user?.username?.[0]?.toUpperCase() || "U"}
//             </div>

//             {isHovered && (
//               <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center">
//                 <TbCameraPlus size={24} className="text-white" />
//               </div>
//             )}
//           </div>

//           {/* INFO */}
//           <div className="text-center md:text-left">
//             <h2 className="text-3xl font-bold text-white">
//               {user?.username || "Unknown"}
//             </h2>
//             <p className="text-slate-400">{user?.email || "No email"}</p>
//           </div>

//           <button className="md:ml-auto px-6 py-2.5 bg-white text-black rounded-xl font-bold hover:bg-indigo-500 hover:text-white transition">
//             Edit Profile
//           </button>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

//         {/* LEFT */}
//         <div className="md:col-span-2">
//           <section className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">

//             <h3 className="text-white font-bold mb-6 flex items-center gap-2">
//               <TbUser /> Personal Information
//             </h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

//               <InfoBox
//                 label="Username"
//                 value={user?.username}
//                 icon={<TbUser />}
//               />

//               <InfoBox
//                 label="Email"
//                 value={user?.email}
//                 icon={<TbMail />}
//               />

//               <InfoBox
//                 label="Role"
//                 value="User"
//                 icon={<TbCircleCheck />}
//               />

//               <InfoBox
//                 label="Status"
//                 value="Active"
//                 icon={<TbSettings />}
//               />

//             </div>
//           </section>
//         </div>

//         {/* RIGHT */}
//         <div className="space-y-6">

//           <div className="bg-indigo-600 p-6 rounded-2xl text-white">
//             <p className="text-sm uppercase">Total Articles</p>
//             <h4 className="text-4xl font-bold">
//               {user?.totalArticles || 0}
//             </h4>
//           </div>

//           <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
//             <h3 className="text-white font-bold mb-4">Quick Links</h3>

//             <div className="space-y-2 text-slate-400">
//               <p className="hover:text-white cursor-pointer">Settings</p>
//               <p className="hover:text-white cursor-pointer">Security</p>
//               <p className="hover:text-white cursor-pointer">Privacy</p>
//             </div>

//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }

// /**
//  * INFO BOX COMPONENT (CLEAN)
//  */
// function InfoBox({ label, value, icon }) {
//   return (
//     <div className="space-y-1.5">
//       <p className="text-xs uppercase text-slate-500">{label}</p>

//       <div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl border border-white/5">
//         <span className="text-indigo-400">{icon}</span>
//         <span className="text-slate-200 text-sm">
//           {value || "N/A"}
//         </span>
//       </div>
//     </div>
//   );
// }

// export default Profile;

























import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TbUser,
  TbMail,
  TbSettings,
  TbCameraPlus,
  TbCircleCheck,
} from "react-icons/tb";
import {
  getUserProfile,
  updateUserProfile,
} from "@/redux/api/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const user = currentUser || {};

  const [isHovered, setIsHovered] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  // Fetch user
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // Sync form with user data
  useEffect(() => {
    if (user?.username) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUserProfile(formData));
    setShowEdit(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* HEADER */}
      <div className="bg-slate-900 rounded-3xl p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          
          {/* AVATAR */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
              {user?.username?.[0]?.toUpperCase() || "U"}
            </div>

            {isHovered && (
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center">
                <TbCameraPlus size={24} className="text-white" />
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white">
              {user?.username || "Unknown"}
            </h2>
            <p className="text-slate-400">
              {user?.email || "No email"}
            </p>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => setShowEdit(!showEdit)}
            className="md:ml-auto px-6 py-2 bg-white text-black rounded-xl font-bold hover:bg-indigo-500 hover:text-white transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* EDIT FORM */}
      {showEdit && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-slate-900 p-6 rounded-xl space-y-4"
        >
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-3 rounded-lg bg-slate-800 text-white"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-slate-800 text-white"
          />

          <button className="bg-indigo-500 px-4 py-2 rounded-lg text-white">
            Save Changes
          </button>
        </form>
      )}

      {/* CONTENT */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        
        {/* LEFT */}
        <div className="md:col-span-2 bg-slate-900 p-6 rounded-xl">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <TbUser /> Personal Info
          </h3>

          <div className="grid sm:grid-cols-2 gap-6">
            <InfoBox label="Username" value={user?.username} icon={<TbUser />} />
            <InfoBox label="Email" value={user?.email} icon={<TbMail />} />
            <InfoBox label="Role" value="User" icon={<TbCircleCheck />} />
            <InfoBox label="Status" value="Active" icon={<TbSettings />} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="bg-indigo-600 p-6 rounded-xl text-white">
            <p>Total Articles</p>
            <h4 className="text-4xl font-bold">
              {user?.totalArticles || 0}
            </h4>
          </div>
        </div>

      </div>
    </div>
  );
}

// INFO BOX
function InfoBox({ label, value, icon }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg">
        {icon}
        <span className="text-white">{value || "N/A"}</span>
      </div>
    </div>
  );
}

export default Profile; 
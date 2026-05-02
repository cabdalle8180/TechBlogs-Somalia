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
      <div className="bg-slate-950/80 rounded-3xl p-8 shadow-xl">
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
          className="mt-6 bg-slate-950/80 p-6 rounded-xl space-y-4"
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
        <div className="md:col-span-2 bg-slate-950/80 p-6 rounded-xl">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <TbUser /> Personal Info
          </h3>

          <div className="grid sm:grid-cols-2 gap-6">
            <InfoBox label="Username" value={user?.username} icon={<TbUser />} />
            <InfoBox label="Email" value={user?.email} icon={<TbMail />} />
            <InfoBox label="Role" value={user?.isAdmin ? "Admin" : "User"} icon={<TbCircleCheck />} />
            <InfoBox label="Status" value={user?.isActive ? "Inactive" : "Active"} icon={<TbSettings />} />
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
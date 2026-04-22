import Post from "../models/post.js";
import User from "../models/user.js";

/* =========================
   GET CURRENT USER PROFILE
========================= */
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const postCount = await Post.countDocuments({ author: userId });
    res.status(200).json({
  success: true,
  data: {
    ...user.toObject(),
    totalArticles: postCount
  }
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
    });
  }
};




export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user?._id; // 👈 safe check

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const { username, email } = req.body;

    if (!username && !email) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        ...(username && { username }),
        ...(email && { email }),
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    console.log("UPDATE ERROR:", error); // 👈 muhiim

    res.status(500).json({
      success: false,
      message: error.message, // 👈 ha qarin error-ka
    });
  }
};




// export const getAllUsers = async (req, res) => {
//   try {
//     if ( req.user|| !req.user?.isAdmin) {
//       return res.status(403).json({
//         success: false,
//         message: "you are not authorized to access this resource",
//       });
//     }

//     const users = await User.find()
//       .select("-password")
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       count: users.length,
//       data: users,
//     });

//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch users",
//     });
//   }
// };




export const getAllUsers = async (req, res) => {
  try {
    if (!req.user || !req.user?.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this resource",
      });
    }

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      data: users,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};


// delete user bt admin
export const deleteUser = async (req, res) => {
  try {
    if (!req.user || !req.user?.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }

    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};
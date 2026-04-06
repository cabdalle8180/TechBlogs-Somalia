import User from "../models/user.js";
import jwt from "jsonwebtoken";

const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(`Error verifying token: ${error.message}`);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default protectRoutes;
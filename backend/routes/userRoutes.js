import { Router } from "express";
import { getAllUsers, getUserProfile, updateUserProfile } from "../controller/userController.js";
import protectRoutes from "../middlewares/protectRoutes.js";

const router = Router();
router.get("/getUserProfile",protectRoutes,getUserProfile);
router.put("/updateUserProfile",protectRoutes,updateUserProfile);
router.get("/getAllUsers",protectRoutes,getAllUsers)

export default router;
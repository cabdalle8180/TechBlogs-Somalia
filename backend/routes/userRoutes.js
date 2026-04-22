import { Router } from "express";
import { deleteUser, getAllUsers, getUserProfile, updateUserProfile } from "../controller/userController.js";
import protectRoutes from "../middlewares/protectRoutes.js";

const router = Router();
router.get("/getUserProfile",protectRoutes,getUserProfile);
router.put("/updateUserProfile",protectRoutes,updateUserProfile);
router.get("/getAllUsers",protectRoutes,getAllUsers)
router.delete("/deleteUser/:id",protectRoutes,deleteUser)

export default router;
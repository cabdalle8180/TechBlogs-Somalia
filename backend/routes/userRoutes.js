import { Router } from "express";
import { deleteUser, getAllUsers, getUserProfile, updateUserByAdmin, updateUserProfile } from "../controller/userController.js";
import protectRoutes from "../middlewares/protectRoutes.js";

const router = Router();
router.get("/getUserProfile",protectRoutes,getUserProfile);
router.put("/updateUserProfile",protectRoutes,updateUserProfile);
router.get("/getAllUsers",protectRoutes,getAllUsers)
router.delete("/deleteUser/:id",protectRoutes,deleteUser)
router.put("/updateUserRole/:id",protectRoutes,updateUserByAdmin)

export default router;
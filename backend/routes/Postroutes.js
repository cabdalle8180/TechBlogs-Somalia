import { Router } from "express";
import { createPost, deletePost, getAllPosts, getPostById, getUserPosts, updatePost } from "../controller/post.js";
import protectRoutes from "../middlewares/protectRoutes.js";

const router = Router();

router.get("/",getAllPosts)
router.post("/create",protectRoutes,createPost)
router.get("/:id",protectRoutes,getPostById)
router.get("/user/:username",protectRoutes,getUserPosts)
router.delete("/:id",protectRoutes,deletePost)
router.put("/:id",protectRoutes,updatePost)

export default router;
import { Router } from "express";
import { createPost, deletePost, getAllPosts, getPostById, getUserPosts, updatePost } from "../controller/post.js";
import protectRoutes from "../middlewares/protectRoutes.js";

const router = Router();

router.get("/",getAllPosts)
router.get("/user/:username",protectRoutes,getUserPosts)
router.post("/create",protectRoutes,createPost)
router.get("/:id",getPostById)
router.delete("/:id",protectRoutes,deletePost)
router.put("/:id",protectRoutes,updatePost)

export default router;
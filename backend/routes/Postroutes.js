import { Router } from "express";
import { createPost, deletePost, getAllPosts, getPostById, getUserPosts, updatePost } from "../controller/post.js";
import protectRoutes from "../middlewares/protectRoutes.js";

const router = Router();

router.get("/",getAllPosts)
router.post("/create",protectRoutes,createPost)
router.get("/:id",getPostById)
router.get("/user/:username",getUserPosts)
router.delete("/:id",deletePost)
router.put("/:id",updatePost)

export default router;
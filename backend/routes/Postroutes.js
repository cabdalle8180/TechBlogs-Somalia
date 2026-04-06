import { Router } from "express";
import { createPost, deletePost, getAllPosts, getPostById, getUserPosts, updatePost } from "../controller/post.js";

const router = Router();

router.get("/",getAllPosts)
router.post("/create",createPost)
router.get("/:id",getPostById)
router.get("/user/:username",getUserPosts)
router.delete("/:id",deletePost)
router.put("/:id",updatePost)

export default router;
import Post from "../models/post.js";
import User from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req,res) => {
    try {

        const { title, content,image } = req.body;
        const userId= req.user._id.toString();
        
        const user=  await User.findById(userId);
        
        if (!title || !content || !image) {
            return res.status(400).json({ message: "Title, content, and image are required" });
        }
        if (image) {
            const uploadimage = await cloudinary.uploader.upload(image)
            image = uploadimage.secure_url
        }
        const newpost = new Post ({
            title,
            content,
            image,
            author: user._id
            
        });
        await newpost.save();
        res.status(201).json({ message: "Post created successfully", post: newpost });

    } catch (error) {
        console.error(`Error creating post: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
}
// gell all posts
export const getAllPosts = async (req,res) => {}
// get single post
export const getPostById = async (req,res) => {}
// update post
export const updatePost = async (req,res) => {}
// delete post
export const deletePost = async (req,res) => {}
// get user posts
export const getUserPosts = async (req,res) => {}
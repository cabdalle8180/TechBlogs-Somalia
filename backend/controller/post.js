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
export const getAllPosts = async (req,res) => {
    try {
        const posts  = await Post.find().sort({ createdAt: -1}).populate({ path: "author", select: "-password" })

        if (posts.length === 0 ){
            return res.status(404).json ({
                message : "No posts found"
            })
        }
        res.status(200).json({ posts });

    } catch (error) {
        console.error(`Error fetching all posts: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
}
// get single post
export const getPostById = async (req,res) => {
    try {
        const postid = await Post.findById(req.params.id).populate({ path: "author", select: "-password" })
        if (postid.length === 0){
            return res.status(404).json({message: "Post not found"})
        }
        res.status(200).json({ post: postid });
    } catch (error) {
        console.error(`Error fetching post by ID: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
}
// update post
export const updatePost = async (req,res) => {
    try {
        const { title, content,image } = req.body;

        const id = req.params.id;
        const userId = req.user._id.toString();

        const post= await Post.findById(id);
        if (!post){
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: "You are not the author of this post" });
        }
        if (!title && !content && !image) {
            return res.status(400).json({ message: "At least one of Title, content, or image is required" });
        }
        // image update cloudinary
        if (image && image !== post.image) {
            const uploadimage = await cloudinary.uploader.upload(image)
            image = uploadimage.secure_url
        }
        const updatedPost = await Post.findByIdAndUpdate(id, {title, content, image}, { new: true, runValidators: true });
        

        // await updatedPost.save();
        res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        console.error(`Error updating post: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
}
// delete post
export const deletePost = async (req,res) => {
    try {
        const id = req.params.id;
        const userId = req.user._id.toString();
        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== userId){
            return res.status(403).json({ message: "You are not the author of this post" });
        }

        // image delete from cloudinary
        if (post.image) {
            const imageId = post.image.split("/").pop().split(".")[0]
            await cloudinary.uploader.destroy(imageId)
        }

        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(`Error deleting post: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
}
// get user posts
export const getUserPosts = async (req,res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const post = await Post.find({ author: user._id}).sort({ createdAt: -1}).populate({ path: "author", select: "-password" });
        res.status(200).json({ posts: post });
        // res.status(200).json({  post });

    } catch (error) {
        console.error(`Error fetching user posts: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
}
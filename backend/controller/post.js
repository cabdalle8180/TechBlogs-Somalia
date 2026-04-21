import Post from "../models/post.js";
import User from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req,res) => {
    try {

        let { title, category, content, image } = req.body;
        const userId= req.user._id.toString();
        
        const user=  await User.findById(userId);
        
        if (!title || !category || !content) {
            return res.status(400).json({ message: "Title, category, and content are required" });
        }
        if (image) {
            const uploadimage = await cloudinary.uploader.upload(image)
            image = uploadimage.secure_url
        }
        const newpost = new Post ({
            title,
            category,
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
        const { q, category } = req.query;
        const filter = {};
        if (category) filter.category = String(category).toLowerCase();
        if (q) {
            const query = String(q);
            filter.$or = [
                { title: { $regex: query, $options: "i" } },
                { content: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
            ];
        }

        const posts  = await Post.find(filter)
            .sort({ createdAt: -1})
            .populate({ path: "author", select: "-password" })

        res.status(200).json({ posts });

    } catch (error) {
        console.error(`Error fetching all posts: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
}
// get single post
export const getPostById = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id).populate({ path: "author", select: "-password" })
        if (!post){
            return res.status(404).json({ message: "Post not found" })
        }
        res.status(200).json({ post });
    } catch (error) {
        console.error(`Error fetching post by ID: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
}
// update post
export const updatePost = async (req,res) => {
    try {
        let { title, category, content, image } = req.body;

        const id = req.params.id;
        const userId = req.user._id.toString();

        const post= await Post.findById(id);
        if (!post){
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.author.toString() !== userId) {
            // #region agent log
            fetch('http://127.0.0.1:7782/ingest/f9c8f8e5-9fd8-4836-9d96-bd07e83be4eb',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'de2eb2'},body:JSON.stringify({sessionId:'de2eb2',runId:'pre-fix',hypothesisId:'H5',location:'backend/controller/post.js:updatePost:forbidden',message:'update blocked: not owner',data:{postId:id,postAuthor:post.author?.toString(),userId},timestamp:Date.now()})}).catch(()=>{});
            // #endregion
            return res.status(403).json({ message: "You are not the author of this post" });
        }
        if (!title && !category && !content && !image) {
            return res.status(400).json({ message: "At least one of title, category, content, or image is required" });
        }
        // image update cloudinary
        if (image && image !== post.image) {
            const uploadimage = await cloudinary.uploader.upload(image)
            image = uploadimage.secure_url
        }
        const update = {};
        if (typeof title === "string" && title.trim()) update.title = title;
        if (typeof category === "string" && category.trim()) update.category = category.trim().toLowerCase();
        if (typeof content === "string" && content.trim()) update.content = content;
        if (typeof image === "string" && image.trim()) update.image = image;

        const updatedPost = await Post.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        

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
            // #region agent log
            fetch('http://127.0.0.1:7782/ingest/f9c8f8e5-9fd8-4836-9d96-bd07e83be4eb',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'de2eb2'},body:JSON.stringify({sessionId:'de2eb2',runId:'pre-fix',hypothesisId:'H5',location:'backend/controller/post.js:deletePost:forbidden',message:'delete blocked: not owner',data:{postId:id,postAuthor:post.author?.toString(),userId},timestamp:Date.now()})}).catch(()=>{});
            // #endregion
            return res.status(403).json({ message: "You are not the author of this post" });
        }

        // image delete from cloudinary
        if (post.image) {
            // If image is a Cloudinary URL we may not have the exact public_id here.
            // Delete failure should not block post deletion.
            try {
                const imageId = post.image.split("/").pop().split(".")[0]
                await cloudinary.uploader.destroy(imageId)
            } catch (e) {
                console.warn("Cloudinary delete skipped/failed:", e?.message);
            }
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
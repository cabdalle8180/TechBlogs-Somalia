import express from "express"
import dotenv from "dotenv";
import ConnectendDBs from "./config/dbs.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/Authroutes.js";
import postRoutes from "./routes/Postroutes.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config()

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
})

const server = express();
server.use(express.json({ limit: "10mb" }))
server.use(cookieParser())
// routes
server.use("/api/posts",postRoutes)
server.get('/',(req,res)=>{
    res.status(200).send("welcome")})
server.use("/api/auth",authRoutes)


// database connection
ConnectendDBs()

// port
const PORT = process.env.PORT ||8000;

// server listen
server.listen(PORT,()=>{
    console.log(`server is runing on at http://localhost:${PORT}`);
    
})

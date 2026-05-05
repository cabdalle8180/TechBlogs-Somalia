import express from "express"
import dotenv from "dotenv";
import ConnectendDBs from "./config/dbs.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/Authroutes.js";
import postRoutes from "./routes/Postroutes.js";
import { v2 as cloudinary } from "cloudinary";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config()

// Database connection (waa inuu koodhka ka sareeyaa si server-ku uusan u bilaaban isagoo offline ah)
ConnectendDBs()

const server = express();



// Allow both the canonical Vercel domain and any preview deployment
const allowedOrigins = [
  "https://tech-blogs-somalia-re2b.vercel.app",
  "http://localhost:5173"
];

server.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, mobile apps)
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

server.use(express.json({ limit: "10mb" }))
server.use(cookieParser())

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
})

// Routes
server.get('/', (req, res) => {
    res.status(200).send("Server is live and running!")
})

server.use("/api/posts", postRoutes)
server.use("/api/auth", authRoutes)
server.use("/api/users", userRoutes)

// Port - Railway ayaa siinaya port-ka, markaa process.env.PORT waa muhiim
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
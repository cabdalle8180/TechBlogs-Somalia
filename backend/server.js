import express from "express"
import dotenv from "dotenv";
import ConnectendDBs from "./config/dbs.js";
import authRoutes from "./routes/authroutes.js";
const server = express();
dotenv.config()
server.use(express.json())
// routes
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

import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateTokenAndCookies } from "../Utils/token.js";
export const register = async (req, res) =>{
    const  {username, email, password} = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // check email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "email already exists"})
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
        return res.status(400).json({ message: "Username already exists" });
    }
    if(password.length < 6){
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const hassedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hassedPassword });

    
    try {
        if (newUser){
            await newUser.save();
            generateTokenAndCookies(newUser._id, res);
        res.status(201).json({ message: "User registered successfully",
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            
         });

        }
        else {
            return res.status(400).json({ message: "Failed to register user" })
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
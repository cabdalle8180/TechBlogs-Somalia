import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateTokenAndCookies } from "../Utils/token.js";
export const register = async (req, res) =>{
    const  {name, username, email, password} = req.body;
    const resolvedUsername = (typeof name === "string" && name.trim())
      ? name.trim()
      : (typeof username === "string" ? username.trim() : "");

    // #region agent log
    fetch('http://127.0.0.1:7782/ingest/f9c8f8e5-9fd8-4836-9d96-bd07e83be4eb',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'de2eb2'},body:JSON.stringify({sessionId:'de2eb2',runId:'pre-fix',hypothesisId:'H1',location:'backend/Authentication/Auth.js:register',message:'register attempt',data:{hasName:!!name,hasUsername:!!username,hasEmail:!!email,hasPassword:!!password},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    if (!resolvedUsername || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const normalizedEmail = String(email).trim().toLowerCase();
    if (!emailRegex.test(normalizedEmail)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // check email already exists
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
        return res.status(400).json({ message: "email already exists"})
    }

    const existingUsername = await User.findOne({ username: resolvedUsername });

    if (existingUsername) {
        return res.status(400).json({ message: "Username already exists" });
    }
    if(password.length < 6){
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const hassedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username: resolvedUsername, email: normalizedEmail, password: hassedPassword });

    
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

// login

export const login = async (req,res) =>{
    const {email, password, username} = req.body;
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    // #region agent log
    fetch('http://127.0.0.1:7782/ingest/f9c8f8e5-9fd8-4836-9d96-bd07e83be4eb',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'de2eb2'},body:JSON.stringify({sessionId:'de2eb2',runId:'pre-fix',hypothesisId:'H2',location:'backend/Authentication/Auth.js:login',message:'login attempt',data:{hasEmail:!!email,hasUsername:!!username,hasPassword:!!password},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    if((!normalizedEmail && !username) || !password){
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = normalizedEmail
          ? await User.findOne({ email: normalizedEmail })
          : await User.findOne({ username });
        if(!user){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateTokenAndCookies(user._id, res);
        res.status(200).json({ message: "Login successful",
            _id: user._id,
            username: user.username,
            email: user.email,
         });
         
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const logout = (req,res) =>{
    try {
        res.clearCookie("access_token");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });

    }
}
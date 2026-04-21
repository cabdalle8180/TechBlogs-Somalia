import User from "../models/user.js";
import jwt from "jsonwebtoken";

const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      // #region agent log
      fetch('http://127.0.0.1:7782/ingest/f9c8f8e5-9fd8-4836-9d96-bd07e83be4eb',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'de2eb2'},body:JSON.stringify({sessionId:'de2eb2',runId:'pre-fix',hypothesisId:'H3',location:'backend/middlewares/protectRoutes.js:no-token',message:'protectRoutes blocked: missing cookie token',data:{path:req.path,method:req.method},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      // #region agent log
      fetch('http://127.0.0.1:7782/ingest/f9c8f8e5-9fd8-4836-9d96-bd07e83be4eb',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'de2eb2'},body:JSON.stringify({sessionId:'de2eb2',runId:'pre-fix',hypothesisId:'H3',location:'backend/middlewares/protectRoutes.js:bad-decode',message:'protectRoutes blocked: jwt verify returned falsy decoded',data:{path:req.path,method:req.method},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      // #region agent log
      fetch('http://127.0.0.1:7782/ingest/f9c8f8e5-9fd8-4836-9d96-bd07e83be4eb',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'de2eb2'},body:JSON.stringify({sessionId:'de2eb2',runId:'pre-fix',hypothesisId:'H3',location:'backend/middlewares/protectRoutes.js:user-not-found',message:'protectRoutes blocked: decoded user not found',data:{userId:decoded?.userId,path:req.path,method:req.method},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    // #region agent log
    fetch('http://127.0.0.1:7782/ingest/f9c8f8e5-9fd8-4836-9d96-bd07e83be4eb',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'de2eb2'},body:JSON.stringify({sessionId:'de2eb2',runId:'pre-fix',hypothesisId:'H4',location:'backend/middlewares/protectRoutes.js:ok',message:'protectRoutes allowed',data:{userId:user?._id?.toString(),path:req.path,method:req.method},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    next();
  } catch (error) {
    console.error(`Error verifying token: ${error.message}`);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default protectRoutes;
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authmiddleware = async(req,res,next)=>
{
    try{

    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Access denied. please login"})
    }
    const verifytoken = await jwt.verify(token,process.env.SECRET);
  const user = await User.findById(verifytoken.id).select("-password");
  if(!user){
   return res.status(401).json({message:"user not found"});
  }
  req.loggeduser =user;
  next();
}
catch(error){
    res.status(401).json({message:"unauthorized access"});
}
}
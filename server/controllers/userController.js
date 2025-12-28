import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const register = async(req,res)=>{
    try{
    const {username,password} = req.body;  
    if(!username || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    const existingUser = await User.findOne({username});
    if(existingUser){
        return res.status(400).json({message:"Username already exists"});
    }
  //hash the password
 const hashedPassword =await bcrypt.hash(password,10);
 req.body.password = hashedPassword;
 const newUser = await User.create(req.body);
    res.status(201).json({message:"user created successfully"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};

export const login = async(req,res)=>{
    try{
        const {username,password} = req.body;
        if(!username || !password){
            return res.status(400).json({message:"All fields are required"});
        }
//find user
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).json({message:"invalid username"})
    }
    //check password
    const matchpassword = await bcrypt.compare(password,user.password);
    if(!matchpassword){
        return res.status(400).json({message:"invalid password"});
    }
    //create jwt token
    const token =jwt.sign({id:user._id,username:user.username},process.env.SECRET,{expiresIn:process.env.EXPIRES_IN});
     // save token in cookie
  res.cookie("token", token, {
    httpOnly: true,
     secure: true,        // REQUIRED for production
     sameSite: "none",    // REQUIRED for cross-site cookies
  });
    
    res.status(201).json({message:"login successful",
        token:token,
        user:{id:user._id,username:user.username}
    });
    }
    catch(error){
              res.status(500).json({message:error.message});  
    }
}




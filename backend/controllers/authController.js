const User=require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcryptjs")
const createToken=(id,expires)=>{
    
    return jwt.sign({id:id},process.env.JWT_SECRET_KEY,{expiresIn:`${expires}`});

}
const registerUser=async(req,res)=>{
    try{

        const {name,email,password}=req.body;

        if(!name || !email || !password){
            return res.status(400).json({
              message: "All fields are required",
            });
        }
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message:"User already exists Please login!"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const user=await User.create({
            name,
            email,
            password:hashedPassword
        })
        const accessToken=createToken(user._id,"15m");
        const refreshToken=createToken(user._id,"15d")
        res.cookie("accessToken",accessToken,{
            httpOnly:true,
            secure:false,
            sameSite:"lax"
        })
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        });

        res.status(201).json({
            user
        })
        
    }
    catch(error){
        console.log("Error in user registeration",error);
        res.status(500).json({
            message:"server error"
        })
    }
}
const loginUser=async(req,res)=>{
    try{
        
        const { email, password } = req.body;

        if ( !email || !password) {
          return res.status(400).json({
            message: "All fields are required",
          });
        }
        const userExists = await User.findOne({email});
        if (!userExists) {
          return res.status(400).json({
            message: "User doesn't exists Please register!",
          });
        }

        const checkPassword = await bcrypt.compare(password,userExists.password);
        if(!checkPassword){
            return res.status(400).json({
                message:"email or password is invalid"
            })
        }

        
        const accessToken = createToken(userExists._id, "15m");
        const refreshToken = createToken(userExists._id, "15d");
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        });

        res.status(201).json({
          userExists,
        });
        
    }
    catch(error){
         console.log("Error in user registeration", error);
         res.status(500).json({
           message: "server error",
         });
    }
}
const logout=async(req,res)=>{
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({
        message:"user logged out"
    })
}
module.exports={loginUser,registerUser,logout}
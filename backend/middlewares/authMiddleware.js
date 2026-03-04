const jwt=require("jsonwebtoken");
const protect=async(req,res,next)=>{
    try{
        const token=req.cookies.accessToken;
        if(!token){
            return res.status(400).json({
                message:"No access token present"
            })
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=decoded.id;
        next();


    }
    catch(error){
        console.log("Authentication error",error);
        res.stayus(500).json({
          message: "Authentication error",
        });
    }
}
module.exports=protect;
const express=require("express");
const router=express.Router();

const {loginUser,registerUser,logout}=require("../controllers/authController")
const protect=require("../middlewares/authMiddleware")

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logout)
router.get("/me",protect,async(req,res)=>{
    res.status(200).json({
        message:"I got the user"
    })
})
module.exports=router;


const express=require("express");

const router=express.Router();
const protect=require("../middlewares/authMiddleware");
const {createSession,getSessions}=require("../controllers/sessionController")

router.post("/",protect,createSession);
router.get("/",protect,getSessions);
module.exports=router;
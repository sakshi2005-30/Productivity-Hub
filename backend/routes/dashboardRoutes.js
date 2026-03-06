const express=require("express");
const router=express.Router();
const protect=require("../middlewares/authMiddleware");
const {taskStats,sessionStats}=require("../controllers/dashboardComtroller");

router.get("/task",protect,taskStats);
router.get("/session",protect,sessionStats);
module.exports=router;
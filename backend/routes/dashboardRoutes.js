const express=require("express");
const router=express.Router();
const protect=require("../middlewares/authMiddleware");
const {taskStats,sessionStats,weeklyStudyAnalytics}=require("../controllers/dashboardComtroller");

router.get("/task",protect,taskStats);
router.get("/session",protect,sessionStats);
router.get("/weekly-study",protect,weeklyStudyAnalytics);
module.exports=router;
const Task=require("../models/Task");
const Session=require("../models/Session")
const taskStats=async(req,res)=>{
    try{
        const totalTasks=await Task.countDocuments();
        const completedTasks = await Task.countDocuments({ completed: true });
        const pendingTasks=await Task.countDocuments({completed:false});
        res.status(200).json({
            totalTasks,
            completedTasks,
            pendingTasks
        })
    }
    catch(error){
          console.log("Dashboard  task error", error);
          res.status(500).json({ message: "Server error" });
    }
}
const sessionStats=async(req,res)=>{
    try{
        const stats=await Session.aggregate([
            {
                $group:{
                    _id:null,
                    totalMinutes:{$sum:"$duration"},
                    totalSessions:{$sum:1}
                }
            }
        ])
        res.status(200).json({
            totalStudyMinutes:stats[0]?.totalMinutes || 0,
            totalStudySessions:stats[0]?.totalSessions ||0

        })
    }
    catch(error){
         console.log("Dashboard  session error", error);
         res.status(500).json({ message: "Server error" });
    }
}
module.exports={taskStats,sessionStats};

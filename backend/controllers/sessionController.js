const Session=require("../models/Session");

const createSession=async(req,res)=>{
    try{
        const {topic,duration}=req.body;
        if(!topic || !duration){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        const session=await Session.create({
            topic,
            duration,
            userId:req.user
        })
        res.status(201).json(session)
    }
    catch(error){
        console.log("Error in creating session",error);
        res.status(500).json({
            message:"Server error"
        })
    }   
}
const getSessions=async(req,res)=>{
    try{
        const sessions=await Session.find({userId:req.user});
        res.status(200).json(sessions)
    }
    catch(error){
        console.log("Error in getting session", error);
        res.status(500).json({
          message: "Server error",
        });
    }
}
module.exports={createSession,getSessions};
const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const {title,description}=req.body;

    if(!title || !description){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    const task=await Task.create({
        title,
        description,
        userId:req.user
    })
    res.status(201).json({
        task
    })
  } catch (error) {
    console.log("error in creating task",error);
    res.status(500).json({
        message:"Server error"
    })
  }
};
const getTasks = async (req, res) => {
  try {
    const tasks=await Task.find({userId:req.user});
    res.status(200).json(tasks)
  } catch (error) {
    console.log("Error in getting tasks");
    res.status(500).json({
        message:"server error"
    })
  }
};
const updateTask = async (req, res) => {
  try {
    console.log("id:",req.params.id)
    const id=req.params.id;
    const {title,description}=req.body;

    const task=await Task.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json(task);

  } catch (error) {
     console.log("Error in updating task",error);
     res.status(500).json({
       message: "server error",
     });
  }
};
const deleteTask = async (req, res) => {
  try {
    const id=req.params.id;
    const task=await Task.findByIdAndDelete(id);
    res.status(200).json(task);
  } catch (error) {
     console.log("Error in deleting task", error);
     res.status(500).json({
       message: "server error",
     });
  }
};
module.exports={createTask,getTasks,updateTask,deleteTask};
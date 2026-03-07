const Task = require("../models/Task");

const createTask = async (req, res,next) => {
  try {
    
    const {title,description,completed}=req.body;

    if(!title || !description){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    const task=await Task.create({
        title,
        description,
        completed,
      
        userId:req.user
    })
    res.status(201).json({
        task
    })
  } catch (error) {
    next(error)
  }
};
const getTasks = async (req, res,next) => {
  try {
    const tasks=await Task.find({userId:req.user});
    res.status(200).json(tasks)
  } catch (error) {
     next(error);
  }
};
const updateTask = async (req, res,next) => {
  try {
    console.log("id:",req.params.id)
    const id=req.params.id;
    const {title,description}=req.body;

    const task=await Task.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json(task);

  } catch (error) {
      next(error);
  }
};
const deleteTask = async (req, res,next) => {
  try {
    const id=req.params.id;
    const task=await Task.findByIdAndDelete(id);
    res.status(200).json(task);
  } catch (error) {
      next(error);
  }
};
const testError = (req, res, next) => {
  try {
    throw new Error("Test error middleware");
  } catch (error) {
    next(error);
  }
};
module.exports={createTask,getTasks,updateTask,deleteTask,testError};
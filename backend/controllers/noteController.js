const Note = require("../models/Note");

const createNote = async (req, res) => {
  try {
    const {title,content,tags}=req.body;

    if(!title || !content){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    const note=await Note.create({
        title,
        content,
        tags,
        userId:req.user
    })
    res.status(201).json({
       note
    })
  } catch (error) {
    console.log("error in creating note",error);
    res.status(500).json({
        message:"Server error"
    })
  }
};
const getNotes = async (req, res) => {
  try {
    const page=req.query.page || 1;
    const limit=req.query.limit || 5;
    const skip=(page-1)*limit;
    const notes=await Note.find({userId:req.user}).skip(skip).limit(limit);
    res.status(200).json(notes)
  } catch (error) {
    console.log("Error in getting notes");
    res.status(500).json({
        message:"server error"
    })
  }
};
const updateNote = async (req, res) => {
  try {
    console.log("id:",req.params.id)
    const id=req.params.id;
    

    const note=await Note.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json(note);

  } catch (error) {
     console.log("Error in updating note",error);
     res.status(500).json({
       message: "server error",
     });
  }
};
const deleteNote = async (req, res) => {
  try {
    const id=req.params.id;
    const note = await Note.findByIdAndDelete(id);
    res.status(200).json(note);
  } catch (error) {
     console.log("Error in deleting note", error);
     res.status(500).json({
       message: "server error",
     });
  }
};
const search=async(req,res)=>{
    try{
        const query=req.query.q;
        console.log("query:",query)
        if(!query){
            return res.status(400).json({
                message:"Query required"
            })
        }
        const notes = await Note.find({
          $or: [
            { title: new RegExp(query, "i") },
            { content: new RegExp(query, "i") },
          ],
        });
        res.status(200).json(notes)
    }
    catch(error){
        console.log("Error in searching",error);
        res.status(500).json({
            message:"Server error"
        })
    }
}
module.exports={createNote,getNotes,updateNote,deleteNote,search};
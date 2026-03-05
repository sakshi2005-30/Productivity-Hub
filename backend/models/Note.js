const mongoose=require("mongoose");
const notesSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    }
    ,
    content:{
        type:String,
        required:true,

    }
    ,
    tags:{
        type:[]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});
module.exports=mongoose.model("Note",notesSchema)
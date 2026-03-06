const mongoose=require("mongoose");
const sessionSchema=mongoose.Schema({
    topic:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});
module.exports=mongoose.model("Session",sessionSchema);
const errorMiddleware=async(err,req,res,next)=>{
    let statusCode=res.statusCode===200?500:res.statusCode;
    res.status(statusCode).json({
        succes:false,
        message:err.message || "Server error",
        data:null
    })

}
module.exports=errorMiddleware;
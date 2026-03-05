const express=require("express");
const router=express.Router();

const {createNote,getNotes,updateNote,deleteNote,search}=require("../controllers/noteController");
const protect=require("../middlewares/authMiddleware")
router.post("/",protect,createNote);
router.get("/",protect,getNotes);
router.put("/:id",protect,updateNote);
router.delete("/:id",protect,deleteNote);
router.get("/search",protect,search);
module.exports=router;
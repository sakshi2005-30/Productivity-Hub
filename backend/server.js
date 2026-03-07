require("dotenv").config();
const express=require("express");
const cors=require("cors");
const cookieParser=require("cookie-parser")
const connectToDB=require("./config/db")
const authRoutes=require("./routes/authRoutes")
const taskRoutes=require("./routes/taskRoutes")
const noteRoutes=require("./routes/noteRoutes");
const sessionRoutes=require("./routes/sesssionRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const app=express();
app.use(express.json());

app.use(cors());
app.use(cookieParser());
connectToDB();
app.use("/api/auth",authRoutes)
app.use("/api/tasks",taskRoutes)
app.use("/api/note",noteRoutes);
app.use("/api/session",sessionRoutes);
app.use("/api/dashboard",dashboardRoutes)
app.use(errorMiddleware);

const PORT=process.env.PORT  || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})
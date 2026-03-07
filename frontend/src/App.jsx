import { useState,useContext } from "react"
import { Routes,Route } from "react-router"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import {Authcontext} from "./context/AuthContext"
const App = () => {
  const { user } = useContext(Authcontext);
  console.log("user",user);
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={user?<Dashboard/>:<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
import { useState ,useContext} from "react"
import { login } from "../utils/authApi"
import {useNavigate} from "react-router"
import { Authcontext } from "../context/AuthContext"
const Login = () => {
  
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const {setUser}=useContext(Authcontext);
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await login(email,password);
      navigate("/dashboard")
      setUser(res.data)
      console.log("res:",res.data);

    }
    catch(error){
      console.log("Error in login",error);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white py-4 px-6 text-gray-800 rounded-lg flex flex-col w-sm">
        <p className="text-center text font-medium mb-4">Login</p>
        <form className="text-sm flex flex-col space-y-4" onSubmit={handleSubmit}>
          
          <label>
            <p className="font-medium mb-1 ">Email:</p>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              className="border  w-full px-4 py-1 rounded-lg border-gray-400 outline-none focus-within:border-gray-700"
            />
          </label>
          <label>
            <p className="font-medium mb-1">Password:</p>
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              className="border  w-full px-4 py-1 rounded-lg border-gray-400 outline-none focus-within:border-gray-700"
            />
          </label>
          <button className="my-2 w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-black/90 text-sm">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login
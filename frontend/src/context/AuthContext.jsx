import {useState,createContext,useEffect} from "react";
import api from "../utils/api";
export const Authcontext=createContext();


const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
               const res= await api.get("/auth/me");
                setUser(res.data.user);
            }
            catch(error){
                console.log("Error in fetching user",error);
                setUser(null);
            }
        }
        fetchUser()
    },[])
  return (
    <Authcontext.Provider value={{user,setUser}}>
        {children}

    </Authcontext.Provider>
  )
}

export default AuthProvider;
import api from "./api";
export const register=async(name,email,password)=>{
    return api.post("/auth/register",{
        name,
        email,password
    })
}
export const login=async(email,password)=>{
    return api.post("/auth/login",{
        email,password
    })
}
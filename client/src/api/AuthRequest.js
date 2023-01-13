import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });


export const sendOtp=(formData)=>API.post("/send-otp",formData)

export const userLogin=(values,header)=>API.post("/auth/login",values,header)


export const userRegister=(userDetails)=>API.post("/auth/register",userDetails)
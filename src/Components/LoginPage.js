import React, { useState } from "react"
import Base from "../Base/Base"
import { Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
const LoginPage = () =>{
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

const handleLogin = async ()=>{
    const userDetails = {
        email,
        password
    }
   const response = await fetch(`https://stack-overflow-clone-six.vercel.app/api/user/login`,{
    method : "POST",
    body:JSON.stringify(userDetails),
    headers:{
        "Content-type":"application/json"
        
    }
   }); 
   
   const data = await response.json()
   console.log(data.token)
   if(data.token) {
       setError("")
      localStorage.setItem("token", data.token)
      navigate("/")
     }else {
      setError(data.message)
     }
   }
   
   
    return (
        <Base>
        <div className="login_page">
        <TextField label="email" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        type="email"
        />
        <TextField label="password" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <Button
        type="submit"
        variant ="contained"
        onClick={handleLogin}
        >Login</Button>
 {error? 
        <Typography color={"danger"}>
           {error}
        </Typography> : "" }
        </div>
        </Base>
       
    )
}

export default LoginPage
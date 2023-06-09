import React, { useState } from "react"
import Base from "../Base/Base"
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const SignupPage = () =>{
    const navigate = useNavigate()
    const [name,setName]=useState("")
    const [contact,setContact]=useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

const handleSignUp = async ()=>{
    const userDetails = {
        email,
        password,
        name,
        contact:Number(contact)
    }
   const response = await fetch(`https://stack-overflow-clone-six.vercel.app/api/user/signup`,{
    method : "POST",
    body:JSON.stringify(userDetails),
    headers:{
        "Content-type":"application/json"
        
    }
   }); 

   const data = await response.json()
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
        <TextField label="Name" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter your Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        type="text"
        />
        <TextField label="email" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        type="email"
        />
        <TextField label="contact" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Contact"
        value={contact}
        onChange={(e)=>setContact(e.target.value)}
        type="text"
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
        onClick={handleSignUp}
        >SignUp</Button>
 {error? 
        <Typography color={"danger"}>
           {error}
        </Typography> : "" }
        </div>
        </Base>
       
    )
}

export default SignupPage
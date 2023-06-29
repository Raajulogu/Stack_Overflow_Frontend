import React, { useEffect, useState } from "react"
import Base from "../Base/Base"
import { Button,  Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
const UserPage = () =>{
    const navigate = useNavigate()
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState("");
    const [tokenId, setTokenId]= useState("");
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/login", {replace:true})
        }
        let token = localStorage.getItem("token")
        setTokenId(token)
        const fetchUserData = async()=>{
         const res = await fetch(`https://stack-overflow-clone-six.vercel.app/api/question/user`, {
            method:"GET",
            headers:{
                "x-auth" : token
            }
         });
         const data = await res.json()
            if(!data.data) {
            setError(data.message)
            
         }
         setUserData(data.data)
        }
        fetchUserData()
    }, [])


    return (
        <Base>
        
        {userData && (
             <div>
                {userData?.map((data, index)=>(
                   <Paper 
                   elevation={6}
                   key={data._id}
                   >
                     <p>Title : {data.questionTitle}</p>
                     <p>Body : {data.questionBody}</p>
                     <p>date : {data.date}</p>
                     <p>Tags : {data.questionTags}</p>
                     <p>Answers : {data.answers}</p>
                     <p>posted by: {data.name}</p>
                     <Button onClick={()=>navigate(`/answer/${data._id}/${tokenId}`)}>Answer</Button>
                     <Button>Delete</Button>
                   </Paper>
                ))}
             </div>
             
        )}

     {error? 
        <Typography color={"danger"}>
           {error}
        </Typography> : "" }
        </Base>
    )
}

export default UserPage
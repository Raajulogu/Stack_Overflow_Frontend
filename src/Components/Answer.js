import React, {  useState } from "react"
import Base from "../Base/Base"
import { useNavigate, useParams } from "react-router-dom"
import { Button, TextField, Typography } from "@mui/material"
const Answer = ({userData, setUserData}) =>{
    const [body, setBody] = useState("")
    const [error, setError] = useState("")
    const [sucessMsg, setSucessMessage] = useState("")
    const {id, token} = useParams();
    const navigate = useNavigate()

    async function handleanswers(){

        const answer = {
            body
            }

        const res = await fetch(`https://stack-overflow-clone-six.vercel.app/api/question/answer/${id}`, {
            method:"PUT",
            body:JSON.stringify(answer),
            headers: {
                "Content-Type":"application/json",
                "x-auth": token,
            }
        });

         const data = await res.json();
         if(!data.data){
            setError(data.message)
             setSucessMessage("")
         }
        //  const userindex = userData?.findIndex((data, idx)=>data._id === id);
        //  userData[userindex] = data.data;
        //   await setUserData([...userData])
          setSucessMessage(data.message)
    }

    return (
        <Base>
        <form className="answer_form">
          
         <TextField label="Answer" 
       variant="outlined" fullWidth sx={{ m: 1}}
       inputProps={{sx:{height: 100}}}
        placeholder="Enter the Your Answer"
        type="text"
        value={body}
        onChange={(e)=>setBody(e.target.value)}
        />
      

        <Button
        type="submit"        variant ="contained"
        onClick={handleanswers}
        >Post Answer</Button>


       <Button
        type="submit"        variant ="contained"
        onClick={()=>navigate("/")}
        >Home</Button>

       {error? 
        <Typography color={"danger"}>
           {error}
        </Typography> : "" }

        {sucessMsg? 
        <Typography color={"success"}>
           {sucessMsg}
        </Typography> : "" }
          </form>
        
        </Base>
    )
}

export default Answer
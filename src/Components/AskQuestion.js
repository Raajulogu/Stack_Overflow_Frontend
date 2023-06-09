import React, { useState } from "react"
import Base from "../Base/Base"
import { Button, TextField, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
const AskQuestion = ({userData, setUserData}) =>{
     const {token} = useParams();
     const [name,setName]=useState("")
     const [title, setTitle] = useState("")
     const [body, setBody] = useState("")
     const [tags, setTags] = useState("")
    const [error, setError] = useState("")
    const [sucessMsg, setSucessMessage] = useState("")

const navigate = useNavigate()
    async function postNewQuestion(){
        const newQues = {
            questionTitle:title,
            questionBody:body,
            questionTags:tags,
            name:name
        }
        console.log(newQues)
        const res = await fetch(`https://stack-overflow-clone-six.vercel.app/api/question/ask`, {
            method:"POST",
            body:JSON.stringify(newQues),
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
       setUserData([...userData, data.data])
       setSucessMessage(data.message)
       navigate("/user")
    }

    return (
        <Base>
        <div>
          <form className="question_form">
          <TextField label="Name" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the your name"
        type="text"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
          <TextField label="Title" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        type="text"/>
         <TextField label="Body" 
       variant="outlined" fullWidth sx={{ m: 1}}
       inputProps={{sx:{height: 100}}}
        placeholder="Enter the Body of the  questions"
        type="text"
        value={body}
        onChange={(e)=>setBody(e.target.value)}
        />
        <TextField label="Tags" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the tags"
        type="text"
        value={tags}
        onChange={(e)=>setTags(e.target.value)}
        />
        
      

        <Button
        type="submit"        variant ="contained"
        onClick={()=>postNewQuestion()}
        >Post Question</Button>

       {error? 
        <Typography color={"danger"}>
           {error}
        </Typography> : "" }

        {sucessMsg? 
        <Typography color={"danger"}>
           {sucessMsg}
        </Typography> : "" }
          </form>
        </div>
        </Base>
    )
}

export default AskQuestion
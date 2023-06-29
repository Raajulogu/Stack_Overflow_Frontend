import React, { useState } from "react"
import Base from "../Base/Base"
import { Button, TextField, Typography } from "@mui/material"
const AskQuestion = () =>{
     const [name,setName]=useState("")
     const [title, setTitle] = useState("")
     const [body, setBody] = useState("")
     const [tags, setTags] = useState("")
    const [error, setError] = useState("")
    const [sucessMsg, setSucessMessage] = useState("")
    let token=localStorage.getItem("token")
    console.log(token)
    async function postNewQuestion(){
      
        const newQues = {
            questionTitle:title,
            questionBody:body,
            questionTags:tags,
            name:name
        }
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
       setSucessMessage(data.message)
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
        
      

        <Button      variant ="contained"
        onClick={()=>postNewQuestion()}
        >Post Question</Button>
        <br/>
       {error? 
        <Typography color={"crimson"}>
           {error}
        </Typography> : "" }


          </form>
        </div>
        </Base>
    )
}

export default AskQuestion
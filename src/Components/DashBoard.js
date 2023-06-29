import React, { useEffect, useState } from "react"
import Base from "../Base/Base"
import { useNavigate } from "react-router-dom"
import { Button, Paper, Typography } from "@mui/material";
import Rightsidebar from "./Rightsidebar";
const Dashboard = () =>{
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState("");
    const [tokenId, setTokenId]= useState("");
    const navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/login", {replace:true})
        }
        let token = localStorage.getItem("token")
        setTokenId(token)
        const fetchAllData = async()=>{
         const res = await fetch(`https://stack-overflow-clone-six.vercel.app/api/question/all`, {
            method:"GET",
            headers:{
                "x-auth" : token
            }
         });
         const data = await res.json()
            if(!data.data) {
            setError(data.message)
            
         }
         setQuestions(data.data)
        }
        fetchAllData()
    }, [])

    return (
        <Base>
        <div className="questions_container">
        <div className="ask-question-button">
            <Button
            edge="end" 
            variant="contained" 
            aria-label="Ask Question" 
            onClick={()=>navigate(`/ask/${tokenId}`)}
            sx={{ mr: 2 }}>  
            Ask Question
            </Button>
        </div>
        <br/>

        <div className="row question-box">
            <div className="col-md-6 left-side">
            {questions && (
             <div className="all_questions">
                {questions?.map((data, index)=>(
                   <Paper 
                   elevation={6}
                   key={data._id}
                   className="questions"
                   ><h3 className="question_head">Title</h3>
                     <p className="user_questions">{data.questionTitle}</p>
                     <h3 className="question_head">Body</h3>
                     <p className="user_questions">{data.questionBody}</p>
                     <h3 className="question_head">Tags</h3>
                     <p className="user_questions">{data.questionTags}</p>
                     <p className="question_date"><b>Date :</b> {data.date}</p>
                     <p className="question_date"><b>Posted by:</b> {data.name}</p>
                     <h2 className="ans_head">Answers: </h2>
                     <Asnwers answer={data.answers}/>
                    <br/>
                     <Button onClick={()=>navigate(`/answer/${data._id}`)}>Post Your Answer</Button>
                    <br/>
                   </Paper>
                ))}
             </div>
        )}
            </div>
            <div className="right-side">
                <Rightsidebar/>
            </div>
        </div>
        </div>
    

 {error? 
        <Typography color={"danger"}>
           {error}
        </Typography> : "" }
        </Base>
    )
}

const Asnwers=({answer})=>{
    return(
        <div className="answer_container">
            {answer && (
                <div className="answer_div">
                    {answer?.map((data, index)=>(
                   <Paper 
                   elevation={6}
                   key={data._id}
                   >
                    <h4 className="ans_head">Answer-{index+1}</h4>
                     <p className="answers">{data}</p>
                   </Paper>
                ))}
                </div>
            )}
        </div>
    )
}

export default Dashboard
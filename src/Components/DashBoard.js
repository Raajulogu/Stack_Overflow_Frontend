import React, { useEffect, useState } from "react"
import Base from "../Base/Base"
import { useNavigate } from "react-router-dom"
import { Alert, Button, Paper, Snackbar, Typography } from "@mui/material";

const Dashboard = () =>{
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState("");
    const [tokenId, setTokenId]= useState("");
    const [show,setShow] = useState("hide");
    const [sol,setSol]=useState("");
    const [date,setDate] = useState("");
    const [posted,setPosted] = useState("");
    const [ques,setQues] = useState("");
    const [id,setId]=useState("");
    const [vote,setVote] = useState("");
    const [finder,setFinder]=useState("");
    //Navigation variable
    const navigate = useNavigate()
    
    //Snackbar function
    const [open, setOpen] =useState(false);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };
    //Getting data
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
    //Vote up function
    async function upvote(id){
        let token = localStorage.getItem("token")
        let val={id:id}
        const res = await fetch(`https://stack-overflow-clone-six.vercel.app/api/question/upvote`, {
            method:"PUT",
            body:JSON.stringify(val),
            headers:{
                "Content-Type":"application/json",
                "x-auth" : token
            }
         });
         const data = await res.json()
         if(data){
            handleClick()
         }
    }
    //Vote down function
    async function downvote(id){
        let val={id:id}
        let token = localStorage.getItem("token")
        const res = await fetch(`https://stack-overflow-clone-six.vercel.app/api/question/downvote`, {
            method:"PUT",
            body:JSON.stringify(val),
            headers:{
                "Content-Type":"application/json",
                "x-auth" : token
            }
         });
         const data = await res.json()
         if(data){
         handleClick()
         }
    }
    console.log(finder)
    return (
        <Base>
        
        <div className="questions_container">
        <div className="ask-question-button">
            <div className="search-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            <input
            placeholder="Search"
            value={finder}
            onChange={e=>setFinder(e.target.value)}
            />
            </div>
        
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
                {finder.length<0? questions?.map((data, index)=>(
                   <Paper 
                   elevation={6}
                   key={data._id}
                   className="questions"
                   onClick={()=>{setSol(data.answers);setShow("show");
                   setPosted(data.name);setDate(data.date);setQues(data.questionBody)
                    setId(data._id);setVote(data.votes)}}
                   >
                     <h3 className="question_head">Question</h3>
                     <p className="user_questions">{data.questionBody}</p>
                     <h3 className="question_head">Tag</h3>
                     <p className="user_questions">{data.questionTags}</p>
                    <br/>
                   </Paper>
                )):
                questions?.map((data, index)=>(
                    
                    <Paper 
                    elevation={6}
                    key={data._id}
                    className="questions"
                    onClick={()=>{setSol(data.answers);setShow("show");
                    setPosted(data.name);setDate(data.date);setQues(data.questionBody)
                     setId(data._id);setVote(data.votes)}}
                    >
                        {data.questionBody.includes(finder.toUpperCase())||
                        data.questionBody.includes(finder.toLowerCase())||
                        data.questionBody.includes(finder)
                        ?
                        <div>
                            <h3 className="question_head">Question</h3>
                        <p className="user_questions">{data.questionBody}</p>
                        <h3 className="question_head">Tag</h3>
                        <p className="user_questions">{data.questionTags}</p>
                       <br/>
                        </div>
                        
                        :''}
                      
                    </Paper>
                 ))
                }
             </div>
        )}
            </div>
            <div className="right-side" id={show}>
                <div className="right-side-top">
                <div className="right-side-1">
                <h2 className="ans_head">
                    Question:
                </h2>
                <div className="user_questions">
                    {ques}
                </div>
                <br/>
                <p className="question_date"><b>Date :</b> {date}</p>
                <p className="question_date"><b>Posted by:</b> {posted}</p>
                </div>
                <div className="right-side-2">
                    <h4 className="voting-head">Vote</h4>
                    <svg
                    onClick={()=>upvote(id)}
                    xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-caret-up-square-fill" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 9h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5A.5.5 0 0 0 4 11z"/>
                    </svg>
                    <br/>
                    <div>{vote}</div>
                    <svg 
                    onClick={()=>downvote(id)}
                    xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-caret-down-square-fill" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6H4z"/>
                    </svg>
                </div>
                </div>
                <br/>
                <h2 className="ans_head">Answers: </h2>
                <br/>
                <Asnwers 
                answer={sol}
                id={id}
                />
            </div>
            <Snackbar open={open} autoHideDuration={4000} 
            onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" 
            sx={{ width: '100%' }}>
              Voted Successfully !
            </Alert>
          </Snackbar>
        </div>
        
        </div>
    

 {error? 
        <Typography color={"danger"}>
           {error}
        </Typography> : "" }
        </Base>
    )
}
//Function for getting answers
const Asnwers=({answer,id})=>{
    const navigate = useNavigate()
    return(
        <div className="answer_container">
            {answer && (
                <div className="answer_div">
                    {answer?.map((data, index)=>(
                   <Paper className="answer-paper"
                   elevation={6}
                   key={String(data._id)+String(index)}
                   >
                    <h4 className="ans_head">Answer-{index+1}</h4>
                     <p className="answers">{data}</p>
                   </Paper>
                ))}
                </div>
            )}
            <br/>
             <Button onClick={()=>navigate(`/answer/${id}`)}>Post Your Answer</Button>
        </div>
    )
}

export default Dashboard
import React, { useEffect, useState } from 'react'
import Base from '../Base/Base'
import { useNavigate } from 'react-router-dom'
import { Paper } from '@mui/material';
import "./Company.css";
import Rightsidebar from "./Rightsidebar";

const Company = () => {
  let navigate=useNavigate();
  let [company,setCompany]=useState([]);
  //Getting the data
  useEffect(()=>{
    if(!localStorage.getItem("token")){
        navigate("/login", {replace:true})
    }
    let token = localStorage.getItem("token")
    //Data getting function
    const fetchAllData = async()=>{
     const res = await fetch(`https://stack-overflow-clone-six.vercel.app/api/company/all`, {
        method:"GET",
        headers:{
            "x-auth" : token
        }
     });
     const data = await res.json()
     setCompany(data.data);
    }
    fetchAllData()
}, [])
  return (
    <Base>
        
        <div className="company_container">
        <div className="left-side company-card">
        {company.length? company.map((data, index)=>(
                   <Paper 
                   elevation={6}
                   key={data._id}
                   className="companies"
                   
                   >
                     
                     <p className="company-des">
                     <b >Company :</b>
                      {data.companyname}</p>
                     <p className="company-des">
                     <b>Job Title: </b>
                      {data.jobTitle}</p>
                      <p className="company-des">
                     <b>Location: </b>
                      {data.Location}</p>
                      <p className="company-des">
                        <b>Skills Requeired: </b>
                      {data.Skill}</p>
                      <p className="company-des">
                     <b>Salary: </b>
                      {data.salary}</p>
                      <p className="company-des">
                     <b>Posted: </b>
                      {data.date}</p>
                    <br/>
                   </Paper>
                )):<div>Loading...</div>}
        </div>
        <div className='right-side-bar'>
          <Rightsidebar/>
        </div>
        </div>
    

 
    </Base>
  )
}

export default Company
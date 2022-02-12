import React, { useEffect,useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios'
import "./ViewUser.css"
// or less ideally
const ViewUser = () => {
const[user,setUser]=useState({})
    const{id}=useParams()
    useEffect(()=>{
    if(id){
    getSingleUser(id)
    } 
    },[id])
    const getSingleUser=async(id)=>{
    const response = await axios.get(`/api/users/${id}`)
if (response.data.data) {
setUser(response.data.data)
}
    }  
    return(
       <div style={{marginTop:"150px"}}>
       <div className='card'>
           <div className='card-header'>
               <p>User Contact Detail</p>
           </div>
           <div className='container'>
               <strong>ID:</strong>
               <span>{id}</span>
               <br/>
               <br/>
               <strong>Name:</strong>
               <span>{user.name}</span>
               <br/>
               <br/>
               <strong>Email:</strong>
               <span>{user.email}</span>
               <br/>
               <br/>
               <strong>Contact:</strong>
               <span>{user.contact}</span>
               <br/>
               <br/>
               <Link to="/">
                   <button className='btn btn-edit'>Go back</button>
               </Link>
           </div>
       </div>
       </div>
    )
}
export default ViewUser
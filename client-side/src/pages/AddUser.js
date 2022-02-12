import React, { useEffect,useState } from 'react'
import { useHistory } from 'react-router-dom'
import "./AddUser.css"
import axios from 'axios'
import { toast } from 'react-toastify'
const initialState={
    name:"",
    email:"",
    contact:""
}
const AddArticle = () => {
    const [state,setState]=useState(initialState)
    const {name,email,contact}=initialState
    const history=useHistory()
    const addRecord=async(data)=>{
        const response=await axios.post("/api/user",data)
        if(response.status===200){
            toast.success(response.data)
        }
    }
  
    const handleSubmit=(e)=>{
        e.preventDefault()
        //if(!name||!email||!contact){
        //    toast.error("Please provide value into each input field!")
        //}else{
        addRecord(state)
        //setTimeout(()=>history.push("/"),500)
        history.push("/")
        //}
    }
    const handleInputChange=(e)=>{
        let {name,value}=e.target
        setState({...state,[name]:value})
    }
    return (
        <div style={{marginTop:"100px"}}>
            <form 
            style={{
                margin:"auto",
                padding:"15px",
                maxWidth:"400px",
                alignContent:"center",
            }}
            onSubmit={handleSubmit}
            >
            <label htmlFor='name'>Name</label>
            <input
            type="text"
            id='title'
            name="name"
            onChange={handleInputChange}
            />
            <label htmlFor='email'>Email</label>
            <input
            type="text"
            id='email'
            name="email"
            onChange={handleInputChange}
            />
             <label htmlFor='contact'>Contact</label>
            <input
            type="text"
            id='contact'
            name="contact"
            onChange={handleInputChange}
            />    
            <input type="submit" value="Add"/>
            </form>
            
        </div>
    )
}
export default AddArticle
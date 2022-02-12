import React, { useEffect,useState } from 'react'
import { useHistory,useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const initialState={
    name:"",
    email:"",
    contact:"" 
}
const EditUser = () => {
    const [state,setState]=useState(initialState)
    const {name,email,contact}=initialState
    const history=useHistory()
    const addRecord=async(data)=>{
        const response=await axios.post("/api/user",data)
        if(response.status===200){
            toast.success(response.data)
        }
    }
    const updateUser=async(data,id)=>{
        const response=await axios.put(`/api/users/${id}`,data)
        if(response.status===200){
            toast.success(response.data)
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        //if(!name||!email||!contact){
        //    toast.error("Please provide value into each input field!")
        //}else{
        if(!id){
            addRecord(state)
        }else{
            updateUser(state,id)
        }
        //setTimeout(()=>history.push("/"),500)
        history.push("/")
       // }
    }
    const{id}=useParams()
    useEffect(()=>{
    if(id){
        getSingleUser(id)
    }
    },[id])
    const getSingleUser=async(id)=>{
         const response=await axios.get(`/api/users/${id}`)
        if(response.status===200){
            setState({...response.data[0]})
        }
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
            <input type="submit" value="Edit"/>
            </form>
            
        </div>
    )
}
export default EditUser
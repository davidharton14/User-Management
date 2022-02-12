import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import "./Home.css"
import axios from 'axios'
const Home = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        getUsers()
    }, [])
    const getUsers = async () => {
        const response = await axios.get("/api/allUsers")
        if(response.status===200){
            setData(response.data)
        }
    }
    const onDeleteUser=async(id)=>{
      if(window.confirm("Are you sure that you want to delete this user?")){
          const response=await axios.delete(`/api/users/${id}`)
          if(response.status===200){
              toast.success(response.data)
              getUsers()
          }
      }
    }
    return (
        <div style={{marginTop:"150"}}>
            <table className='styled-table'>
            <thead>
                <tr>
                <th style={{textAlign:"center"}}>Id</th>
                <th style={{textAlign:"center"}}>Name</th>
                <th style={{textAlign:"center"}}>Email</th>
                <th style={{textAlign:"center"}}>Contact</th>
                <th style={{textAlign:"center"}}>Action</th>
                </tr>   
            </thead>
            <tbody>
                {data && data.map((item,index)=>{
                  return(
                      <tr key={index}>
                          <th scope="row">{item.id}</th>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.contact}</td>
                          <td>
                              <Link to={`/edit_user/${item.id}`}>
                                  <button className="btn btn-edit">Edit</button>
                              </Link>
                              <button className="btn btn-delete" onClick={()=>onDeleteUser(item.id)}>Delete</button>
                              <Link to={`/api/users/${item.id}`}>
                                  <button className="btn btn-view" to={`/api/users/${item.id}`}>View</button>
                              </Link>
                          </td>
                      </tr>
                  ) 
                })}
            </tbody>

            </table>
        </div>
    )
}
export default Home
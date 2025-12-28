import React from 'react'
import { useState } from 'react'
import api from '../api'
import { useNavigate  } from 'react-router-dom'
function Login() {
  const [data,setData] = useState({username:" ",password:" "})
  const [message,setMessge] = useState("")
  const navigate = useNavigate();
  const handleChange =(event)=>{

    setData((prev)=>({...prev,
      [event.target.name]:event.target.value}
    ));

  }
  const handleSubmit =async(event)=>{
    event.preventDefault();
    try{
     const response = await api.post("/users/login", data); 
    setMessge(response.data.message);
    setData({username:" ",password:" "})
    window.dispatchEvent(new Event("auth-change"));
  navigate("/");

    }
    catch(error){
    setMessge(error.message);
    }
  }
  return (
<form  onSubmit ={handleSubmit} className="max-w-sm mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
  
  <h2 className="text-2xl font-semibold text-center mb-6 text-slate-800">
    Login
  </h2>

  <input type="text" name="username" onChange={handleChange}
    className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-(--yellow)"
    placeholder="username"
  />

  <input
    type="password" name="password" onChange={handleChange}
    className="border border-gray-300 p-2 w-full mb-6 rounded focus:outline-none focus:ring-2 focus:ring-(--yellow)"
    placeholder="Password"
  />

  <button type="submit" className="bg-(--purple-dark) cursor-pointer hover:bg-(--purple-mid) transition text-white px-4 py-2 w-full rounded">
    Login
  </button>
{message &&  (
  <p className="mt-4 text-enter text-(--purple-dark) font-medium">{message }</p>
)}

</form>

  )
}

export default Login
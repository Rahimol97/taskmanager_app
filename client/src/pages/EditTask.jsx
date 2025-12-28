import {useState,useEffect} from 'react'
import api from '../api';
import {useNavigate,useParams} from 'react-router-dom';

function EditTask() {
  const [data,setData]= useState({
    title:"",
    description:""
  })
const navigate = useNavigate();
const {id} =useParams();

useEffect(()=>{
gettaskbyid();
},[])

const gettaskbyid = async()=>{
  try{
    const response = await api.get(`/task/${id}`);
    setData({
      title:response.data.title,
      description:response.data.description
    });
  }
  catch(error){
    alert(`Error: ${error.message}`);
}

}


const handleChange=(event)=>{
  setData((prev)=>({...prev,[event.target.name]:event.target.value}))
}
const handleSubmit=async(event)=>{
  event.preventDefault();
  try{
const response = await api.put(`/task/${id}`,data);
navigate('/');
  }
  catch(error){
    alert(`Error: ${error.message}`);
  }
}

  return (
    <div className=' min-h-screen  flex justify-center items-start pt-20 bg-gray-100'>
<div className='md:w-1/2 max-w-auto  w-full bg-white rounded-xl shadow-lg p-6 m-3'>
          <h1 className="text-2xl text-(--purple-dark) text-center font-bold">Edit Task</h1>
<form onSubmit={handleSubmit} className='space-y-8'>
<label className='text-md font-semibold text-grey-700 mb-2'>Task Title</label>
<input  type="text" onChange={handleChange} name="title" value={data.title} placeholder="Enter task title" className='w-full rounded-md border border-slate-300 px-4 py-3 mt-2  focus:outline-none' />
<label className='text-md font-semibold text-grey-700 mb-2' >Description</label>
<textarea row="5" onChange={handleChange}  name="description" value={data.description} placeholder="Enter task description" className='w-full rounded-md border border-slate-300 px-4 py-3 mt-2  focus:outline-none' />
<button type="submit" className='w-full cursor-pointer rounded-md text-(--yellow) font-semibold py-3 bg-(--purple-dark)'>Submit</button>

</form>

</div>
    
    </div>
  )
}

export default EditTask
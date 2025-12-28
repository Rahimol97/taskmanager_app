import {useEffect, useState} from 'react'
import api from '../api';
import {useParams} from 'react-router-dom';

function ViewTask() {
const [data,setData]= useState({
  title:"",
  description:"",
  createdAt:"",
  updatedAt:""
})
useEffect(()=>{
gettaskbyid();
},[])
const {id} =useParams();

//format date time
 const formatDateTime = (isoDate) => {
    if (!isoDate) return "";
    return new Date(isoDate).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

const gettaskbyid = async()=>{
  try{
    const response = await api.get(`/task/${id}`);
    setData({
      title:response.data.title,
      description:response.data.description,
      createdAt:response.data.createdAt,
      
      updatedAt:response.data.updatedAt
    });
  }
  catch(error){
    alert(`Error: ${error.message}`);
}
}



  return (
   <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-20 px-3">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Gradient Header */}
        <div className="bg-(--orange) p-3">
          <h1 className="text-2xl text-center md:text-3xl font-bold text-(--purple-dark)">
{data.title}
          </h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
            {data.description}
            </p>
          </div>

          {/* Created Time and updated time */}
          <div className="pt-4 border-t border-gray-200 text-sm text-gray-500">
            Created on:{" "}
            <span className="font-medium text-gray-700">
            {formatDateTime(data.createdAt)}
            </span>
          </div>
                    <div className="pt-4 border-t border-gray-200 text-sm text-gray-500">
            Updated on:{" "}
            <span className="font-medium text-gray-700">
          {formatDateTime(data.updatedAt)}
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ViewTask
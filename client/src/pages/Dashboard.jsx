import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import api from "../api"
import { toast } from "react-toastify";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

const navigate = useNavigate();
useEffect(() => {
  getalltask();
},[])

//fetch all task
  const getalltask = async()=>{
    try{
        
 const response = await api.get("/task");
setTasks(response.data);
console.log( "my response" ,response.data);
  }
  catch(error){
alert(`Error: ${error.message}`);
  }
}
// delete task
const deleteTask = async(taskId)=>{
  try{
const response = await api.delete(`/task/${taskId}`);
getalltask();
  }
  catch(error){
   alert(`Error: ${error.message}`);
  }
}
//authentication
const checkAuthBeforeAction = async (callback) => {
  try {
    await api.get(
      "/users/me",
      { withCredentials: true }
    );

    callback(); //  user is logged in
  } catch {
toast.error("Unauthorized access. Please login first.", {
  style: {
    background: "var(--purple-dark)",
    color: "var(--yellow)",
    fontWeight: "bold",
  },
});  }
};


  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-(--purple-dark)">
          Dashboard
        </h1>

        <button
          onClick={() =>checkAuthBeforeAction(()=> {navigate("/task/add")})}
          className="flex items-center gap-2 bg-(--orange) px-4 py-2 rounded font-semibold cursor-pointer"
        >
          <Plus size={18} /> Add Task
        </button>
      </div>

      {/* Task List */}

{tasks.length === 0 ? (
  <p className="text-(--orange) text-xl font-bold p-5 text-center">No tasks available. Please add a task.</p>
) : (
      <div className="space-y-4">
          {tasks.map(task => (
          <div
            key={task._id}
            className="bg-white shadow rounded-lg p-4 flex justify-between items-center border-l-4"
            
          >
            <div>
              <h3 className="font-semibold text-lg">{task.title}</h3>

            </div>

            <div className="flex gap-4">
              <Eye
                className="cursor-pointer text-(--purple-mid)"
              onClick={() =>checkAuthBeforeAction(()=>{navigate(`/task/view/${task._id}`)}) }
              />
              <Pencil
                className="cursor-pointer text-(--orange)"
               onClick={() =>checkAuthBeforeAction (()=>{navigate(`/task/edit/${task._id}`)})}
              />
              <Trash2
                className="cursor-pointer text-red-500"
               onClick={() =>checkAuthBeforeAction(()=>{deleteTask(task._id)}) }
              />
            </div>
          </div>
         ))}
      </div>
)}
    </div>
  );
}

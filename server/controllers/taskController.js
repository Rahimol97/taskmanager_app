import Task from "../models/taskModel.js";


export const createTask = async(req,res)=>{
    try{
    const task = await Task.create(req.body);
    res.status(201).json({message:"Task created"});

    }
    catch(error){
  res.status(500).json({message:error.message});
  
    }
}
export const getAllTask = async(req,res)=>{
    try{
const tasks = await Task.find();
res.status(200).json(tasks);
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
};
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTask = async(req,res)=>{
    try{
const updated = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
  if (!updated) return res.status(404).json({ message: "task not found" });
    res.status(201).json({message:"task details updated"});
}
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
};

export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "task not found" });
    res.status(201).json({ message: "task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
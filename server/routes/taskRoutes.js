import express from "express";
import {createTask,getAllTask,updateTask,deleteTask,getTaskById} from '../controllers/taskController.js';


const router = express.Router();

router.post('/',createTask);
router.get('/',getAllTask);
router.get('/:id',getTaskById);
router.put('/:id',updateTask);
router.delete('/:id',deleteTask);
export default router;
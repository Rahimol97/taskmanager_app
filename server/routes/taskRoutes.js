import express from "express";
import {createTask,getAllTask,updateTask,deleteTask,getTaskById} from '../controllers/taskController.js';
import authmiddleware  from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/',authmiddleware,createTask);
router.get('/',authmiddleware,getAllTask);
router.get('/:id',getTaskById);
router.put('/:id',updateTask);
router.delete('/:id',deleteTask);
export default router;
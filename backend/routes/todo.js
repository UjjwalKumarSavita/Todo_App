import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js'; // Assuming you have JWT auth middleware
import { createTodo, deleteTodo, getAllTodos, toggleStatus, updateTodo } from '../controller/todo.js';


const router = express.Router();

// Define routes
router.post('/create', verifyToken, createTodo );
router.get('/getalltodos', verifyToken, getAllTodos );
router.patch('/:id/togglestatus',verifyToken, toggleStatus)
router.delete('/delete/:id', verifyToken, deleteTodo);
router.put('/update/:id', verifyToken, updateTodo);

const todoRouter= router
export default todoRouter; 
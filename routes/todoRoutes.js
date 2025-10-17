const express = require('express')
const router = express.Router();
const {getAllTodo, getTodo, createTodo, deleteTodo, deleteAllTodo, editTodo} = require('../controllers/todoController')
const {verifyToken} = require('../middleware/auth')

router.get('/', verifyToken, getAllTodo);
router.get('/:_id', verifyToken, getTodo);
router.post('/', verifyToken, createTodo);
router.put('/:_id', verifyToken, editTodo);
router.delete('/:_id', verifyToken, deleteTodo);
router.delete('/', verifyToken, deleteAllTodo);

module.exports = router;
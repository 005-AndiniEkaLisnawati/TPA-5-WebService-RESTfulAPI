const express = require('express')
const router = express.Router();
const {getAllTodo, getTodo, createTodo, deleteTodo, deleteAllTodo, editTodo} = require('../controllers/todoController')

router.get('/', getAllTodo);
router.get('/:id', getTodo)
router.post('/', createTodo);
router.put('/:id', editTodo);
router.delete('/:id', deleteTodo);
router.delete('/', deleteAllTodo);

module.exports = router;
const express = require('express')
const router = express.Router();
const {getAllTodo, getTodo, createTodo, deleteTodo, deleteAllTodo, editTodo} = require('../controllers/todoController')

router.get('/', getAllTodo);
router.get('/:_id', getTodo)
router.post('/', createTodo);
router.put('/:_id', editTodo);
router.delete('/:_id', deleteTodo);
router.delete('/', deleteAllTodo);

module.exports = router;
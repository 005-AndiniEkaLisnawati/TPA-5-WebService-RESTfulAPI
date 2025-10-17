const Todo = require("../models/todo.model");

module.exports = {
  createTodo: async (req, res) => {
    try {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ message: "Title is required!" });
      }

      const newTodo = new Todo({ title });
      const savedTodo = await newTodo.save();

      res
        .status(201)
        .json({ message: "Todo added successfully!", todo: savedTodo });
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: "Failed to add todo!", error: err.message });
    }
  },

  getAllTodo: async (req, res) => {
    try {
      const allTodo = await Todo.find({});

      res.status(200).json({
        message: "Get all todos successfully!",
        todos: allTodo,
      });
    } catch (err) {
      res.status(500).json({
        message: "Failed to retrieve todos!",
        error: err.message,
      });
    }
  },

  getTodo: async (req, res) => {
    try {
      const { _id } = req.params;
      const getById = await Todo.findById(_id);

      if (!getById) {
        return res.status(404).json({ message: "Todo not found.", todo: null });
      }

      res.status(200).json({
        message: "Todo fetched successfully!",
        todo: getById,
      });
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: "Invalid Todo ID format." });
      }
      res.status(500).json({
        message: "Failed to fetch todo data!",
        error: err.message,
      });
    }
  },

  deleteTodo: async (req, res) => {
    try {
      const { _id } = req.params;
      const todoId = _id.trim();
      const deleteTodo = await Todo.findByIdAndDelete(todoId);

      if (!deleteTodo) {
        return res.status(404).json({ message: "Todo data not found!" });
      }
      res.status(200).json({
        message: "Todo deleted successfully!",
        todo: deleteTodo,
      });
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: "Invalid Todo ID format." });
      }
      res.status(500).json({
        message: "Failed to delete todo!",
        error: err.message,
      });
    }
  },

  editTodo: async (req, res) => {
    try {
      const { _id } = req.params;
      const { title, complete } = req.body;
      
      const updatedTodo = await Todo.findByIdAndUpdate(
        _id,
        { title, complete },
        { new: true, runValidators: true } 
      );

      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo data not found!" });
      }

      res.status(200).json({
        message: "Todo updated successfully!",
        todo: updatedTodo,
      });
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: "Invalid Todo ID format." });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({
        message: "Failed to edit todo!",
        error: err.message,
      });
    }
  },

  deleteAllTodo: async (req, res) => {
    try {
      await Todo.deleteMany({});
      res.status(200).json({ message: "All todos deleted successfully!" });
    } catch (err) {
      res.status(500).json({
        message: "Failed to delete all todos!",
        error: err.message,
      });
    }
  },
};
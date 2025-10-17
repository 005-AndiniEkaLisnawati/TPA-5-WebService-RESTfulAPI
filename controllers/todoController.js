const Todo = require("../models/todo.model")

module.exports = {

  createTodo: async(req, res) => {
   try {
    const {title} = req.body;
    const newTodo = new Todo({
      title
    })
    const savedTodo = await newTodo.save()
    if(!title){
      res.status(401).json({message: "must add title!"})
    }
    res.status(200).json({message: "Add Todo successfully!!",
      Todo: savedTodo
    })

   } catch (err) {
    res.status(500).json({message: "Add todo failed!"})
   }
  },

  getAllTodo: async(req, res) => {
    try {
      const allTodo = await Todo.find({})
      res.status(200).json({
        message: "get all todo!",
        Todo: allTodo
      })
      if(allTodo.length == 0){
        return res.status(200).json({
          message: "no todo data!",
          Todo: []
        })
      }
    } catch (err) {
      res.status(500).json({
        message: "retrieve todo failed!",
        error: err.message
      })
    }
  },

  getTodo: async(req, res) => {
    try {
      const {_id} = req.params;
      const getById = await Todo.findById(_id)

      if(!getById){
        return res.status(404).json({
          message: "no todo data!",
          Todo: null
        })};

        res.status(200).json({
          message: "get todo successfully!",
          id: _id,
          Todo: getById
        })
    } catch (err) {
      res.status(500).json({
        message: "failed to fetch data todos!",
        err: err.message
      })
    }
  },

  deleteTodo: () => {

  },
  editTodo: () => {

  },
  deleteAllTodo: () => {

  }

}
const mongoose = require("mongoose");
const {Shcema} = mongoose;

const todoSchema = new Shcema({
    title: {
        type: String,
        required: true
    },
    complete: {
        
    }

})

const todo = mongoose.model("Todo", todoSchema)
module.exports = todo
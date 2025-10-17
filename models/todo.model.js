const mongoose = require("mongoose");
const {Schema} = mongoose;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    complete: {
        default: false,
        type: Boolean
    }

})

const todo = mongoose.model("Todo", todoSchema)
module.exports = todo
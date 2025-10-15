const mongoose = require("mongoose");

const connectToDb = async() => {
    try {
     const connectionString = process.env.ATLAS_DB;
     mongoose.connect(connectionString);
     console.log("success to connect DB!")
    } catch (error) {
    console.log("failed to connect DB!", error.message)
    process.exit(1)
    }
}

module.exports = connectToDb;
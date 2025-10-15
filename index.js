const dotenv = require('dotenv');
const Allroutes = require("./routes/index");
const express = require("express");
const connectToDb = require("./config/db")

const app = express();
const port = 5001;
dotenv.config();

connectToDb()

app.use(express.json());
app.use('/', Allroutes);


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
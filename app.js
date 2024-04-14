const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const router = require("./routes/router");

const app = express();

// default middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routes
app.use("/", router);       

// connect mongoDB and start server
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(3000, () => {
        console.log("Server is listening at port 3000");
    })
}) 
.catch((error) => console.error(error.message));
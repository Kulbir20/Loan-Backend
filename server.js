const express=require('express')
const app=express();
const cors=require('cors')
const routes = require('./Routes')
const morgan = require('morgan');
const connectDatabase = require('./Config/dbConnection');
require('dotenv').config()

//external functions
connectDatabase();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(morgan())
//routes
app.use('/api',routes)


app.listen("9000",()=>{
    console.log("Server is Running");
})
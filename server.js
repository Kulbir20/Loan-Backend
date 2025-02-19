const express=require('express')
const app=express();
const cors=require('cors')
const routes = require('./Routes')
const morgan = require('morgan');
const connectDatabase = require('./Config/dbConnection');


//external functions
connectDatabase();
app.use(cors());
app.use(express.json());
app.use(morgan())
//routes
app.use('/api',routes)


app.listen("9000",()=>{
    console.log("Server is Running");
})
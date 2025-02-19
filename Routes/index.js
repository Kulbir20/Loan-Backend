const express = require("express");
const router = express.Router();

const userRouter = require('../Routes/Users')

router.use('/user' ,userRouter )


module.exports = router
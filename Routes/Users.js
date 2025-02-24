const express = require('express');
const { signUp, getUsers, userInfo, login, searchUser, userData, verifyToken,protected } = require('../Controllers.js/Users');
const {loanApplied, loanUsers, userDetails } = require('../Controllers.js/LoanUsers');
const router = express.Router();

router.post('/signUp',signUp);
router.post('/login',login);
router.get('/getusers',verifyToken,getUsers);
router.get('/searchuser',searchUser);
router.get('/userdata',userData);
router.post('/loanapplied',loanApplied);
router.get('/loanusers',verifyToken,loanUsers);
router.get('/userdetails/:UserId',userDetails);
// router.get('/userinfo/:id',userInfo);



module.exports = router;
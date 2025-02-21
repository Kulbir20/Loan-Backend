const express = require('express');
const { signUp, getUsers, userInfo, login, searchUser, userData } = require('../Controllers.js/Users');
const {loanApplied, loanUsers } = require('../Controllers.js/LoanUsers');
const router = express.Router();

router.post('/signUp',signUp);
router.post('/login',login);
router.get('/getusers',getUsers);
router.get('/searchuser',searchUser);
router.get('/userdata',userData);
router.post('/loanapplied',loanApplied);
router.get('/loanusers',loanUsers);
// router.get('/userinfo/:id',userInfo);



module.exports = router;
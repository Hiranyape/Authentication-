const express = require("express");
const router = express.Router();
//controller 
const {signupUser,loginUser} = require('../controllers/userController')
//login 
router.post('/login',loginUser);
router.post('/signUp',signupUser);

module.exports = router;
//signup
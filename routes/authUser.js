const express = require ("express");
const router = express.Router()
const auth = require("../middleware/auth")

//const User = require("../models/User");
const { register, login, getCurrentUser  } = require("../controllers/userController");
//const permession = require("../middleware/permission");

//jobSeeker and company Register
router.post('/register',async(req,res)=> {
    await register(req.body,req.body.category,res)
})


// User login
router.post('/login',async (req,res)=> {
    await login(req.body,"User",res)
})
//Admin login
router.post('/admin',async (req,res)=> {
    await login(req.body,"Admin",res)
})


//get the current user with the token
router.get("/" ,auth,getCurrentUser)




module.exports = router
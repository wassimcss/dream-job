const express = require("express");
const {blockUser,getAllUsers} = require("../controllers/adminControler");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/authRole");
const router = express.Router()

//Block user 
router.put("/:id",auth,checkRole(["Admin"]),blockUser)

// Get all users
router.get("/",auth,checkRole(["Admin"]),getAllUsers)

module.exports = router
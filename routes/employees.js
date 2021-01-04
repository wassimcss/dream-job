const express = require("express");
const router = express.Router()
const upload = require("../middleware/upload")


const { addEmployee,getOneEmployee,updateEmployee, getCurrentEmployee, getAllemployees} = require("../controllers/emplyeesController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/authRole");
//get current job seeker
router.get("/profile",auth,getCurrentEmployee)
//manage profile of job Seeker
router.post("/profile/:user_id",auth,checkRole(["Job Seeker"]),upload.single('image'),addEmployee);
router.put("/profile/:user_id",auth,checkRole(["Job Seeker"]),upload.single('image'),updateEmployee)

//Get ALL job Seekers
router.get("/",auth,checkRole(["Company" , "Admin"]),getAllemployees)



module.exports = router
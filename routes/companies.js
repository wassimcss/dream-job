const express = require("express");
const router = express.Router()

const {  addCompany, updateCompany,getOneCompany,getCurrentCompany,getAllcompanies } = require("../controllers/compniesController");
const { getAllemployees } = require("../controllers/emplyeesController");
const { addJob, updateJob, getJobByCompany, deleteJob } = require("../controllers/jobsController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/authRole");
const upload = require('../middleware/upload')

//get Company
router.get("/profile/:id",getOneCompany)
//get current company
router.get("/profile",auth,getCurrentCompany)
//get job by company ID
router.get("/jobs/:user_id",auth,checkRole(["Company"]),getJobByCompany)
//Publish offer
router.post("/newjob/:user_id",auth,checkRole(["Company"]),addJob)
//update offer
router.put("/job/:id",auth,checkRole("Company"),updateJob)
//delete Offer
router.delete("/job/:id",auth,checkRole(["Company","Admin"]),deleteJob)
//manage profile
router.post("/profile/:user_id",auth,checkRole(["Company"]),upload.single('image'),addCompany);
router.put("/profile/:user_id",auth,checkRole(["Company"]),updateCompany)
//consult job seeker profile
router.get("/profiles",auth,checkRole(["Company"]),getAllemployees)
//get All companies
router.get("/",auth,checkRole(["Job Seeker" , "Admin"]),getAllcompanies)


module.exports = router
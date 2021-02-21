const express = require("express");
const router = express.Router()

const { getAlljob, addJob, getOneJob, updateJob,deleteJob } = require("../controllers/jobsController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/authRole");
const pagination = require("../middleware/pagintaion");
const Job = require("../models/Job");
const apply = require("../controllers/apply");
const uploadcv = require("../middleware/uploadcv");


// get all jobs
router.get("/",getAlljob)
// pagination 
router.get("/pagination",pagination(Job), (req,res)=> {
    res.json(res.pagination)
})
 
// get One job
router.get("/:id",auth,checkRole(["Job Seeker","Company"]),getOneJob)
// admin delete offer
router.delete("/:id",auth,checkRole(["Admin"]),deleteJob)

//apply
router.post("/apply/:id",uploadcv.single('cv'),apply)



module.exports = router
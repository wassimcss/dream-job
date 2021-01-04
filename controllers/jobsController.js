const { jobValidation } = require("../validation/jobValidation");
const Job = require("../models/Job");

//Get all jobs
const getAlljob = async (req, res) => {
  const jobs = await Job.find().sort({createdAt:-1});
  try {
    res.send(jobs);
  } catch (err) {
    res.status(400).send(err);
  }
};
// Get ALL job bu company Id
const getJobByCompany = (req, res) => {
  Job.find({ user: req.params.user_id })
    .populate("user", ["name"])
    .then((jobs) => res.send(jobs))
    .catch((err) => res.status(400).send(err));
};
//Get one  job
const getOneJob = async (req, res) => {
  const job = await Job.findById({ _id: req.params.id });
  try {
    res.send(job);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Post a job
const addJob = async (req, res) => {
  //job Validation
  const { error } = jobValidation(req.body);
  if (error) return res.status(400).send({ msg: error.details[0].message });

  const newJob = new Job({
    job: req.body.job,
    description: req.body.description,
    company: req.body.company,
    address: req.body.address,
    contrat: req.body.contrat,
    salary: req.body.salary,
    email: req.body.email,
    user: req.params.user_id,
    field:req.body.field,
    phone:req.body.phone
  });
  try {
    const savedJob = await newJob.save();
    res.send(savedJob);
  } catch (err) {
    res.status(400).send(err);
  }
};

//update a job
const updateJob = async (req, res) => {

  //job Validation
  const { error } = jobValidation(req.body);
  if (error) return res.status(400).send({ msg: error.details[0].message });
  
  const updatedJob = await Job.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        job: req.body.job,
        description: req.body.description,
        company: req.body.company,
        address: req.body.address,
        contrat: req.body.contrat,
        salary: req.body.salary,
        email: req.body.email,
        field:req.body.field,
        phone:req.body.phone
      },
    },
    { new: true, useFindAndModify: false }
  );

  try {
    res.send(updatedJob);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Delete a job
const deleteJob = async (req, res) => {
  const removedJob = await Job.findOne({ _id: req.params.id });
  try {
    await removedJob.remove();
    res.send({ msg: "job is removed" });
  } catch (err) {
    res.status(404).send({ msg: "job already removed" });
  }
};

module.exports = {
  getAlljob,
  getOneJob,
  updateJob,
  deleteJob,
  addJob,
  getJobByCompany,
};

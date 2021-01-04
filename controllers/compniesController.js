
const Company = require("../models/Company")

const { registerValidation } = require("../validation/companyValidation");


//Get all companies
const getAllcompanies = async (req,res) => {
    const companies = await Company.find()
    try {
        res.send(companies)
    }
    catch(err){
        res.status(400).send(err);
    }
}

//Get one  Company
 const getOneCompany = (req,res) => {
     Company.findById({user:req.params.id})
     .populate("user",["name","email"])
     .then(profile =>{
         if (!profile) return res.status(404).send({msg:"no profile"})
         else res.send(profile)
     })
    .catch(err => res.status(400).send(err));
    
}

//get current company
const getCurrentCompany = (req,res) => {
    Company.findOne({user:req.user._id})
    .then(profile =>{
        if (!profile) return res.status(404).send({msg:"no profile"})
        else res.send(profile)
    })
   .catch(err => res.status(400).send(err));
}

//Post a company
 const addCompany = async (req,res) => {
    //let's validate a company
    const  { error } = registerValidation(req.body)
    if (error) return res.status(400).send({msg:error.details[0].message});
    // Check for existant mail
    const emailExist = await Company.findOne({email:req.body.email})
    if (emailExist) return res.status(400).send({msg:'verify your email'})
   
    const newCompany = new Company({
        name :req.body.name,
        email :req.body.email,
        phone :req.body.phone,
        field : req.body.field,
        address :req.body.address,
        user:req.params.user_id,
        
       
    })
    if (req.file) {
        newCompany.image = req.file.path
    }
   
    
    
    try {
        const savedCompany = await newCompany.save();
        res.send(savedCompany)
    }
    catch(err){
        res.status(400).send(err);
    }
}

//update a company
 const updateCompany = async (req,res) => {
      //let's validate a company
    const  { error } = registerValidation(req.body)
    if (error) return res.status(400).send({msg:error.details[0].message});
    
    const updatedCompany = await Company.findOneAndUpdate({user : req.params.user_id},{$set :{
        name :req.body.name,
        email :req.body.email,
        phone :req.body.phone,
        field : req.body.field,
        address :req.body.address,
        
        
    
    }},{new:true,useFindAndModify:false})

    try {
        res.send(updatedCompany)
    }
    catch(err){
        res.status(400).send(err);
    }
}

//publish jobOffer

//Delete a job
/* const deleteCompany = async(req,res) => {
    const removedCompany = await Company.findOne({_id:req.params.id})
    try {
        await removedCompany.remove();
        res.send({msg:"Company is removed"})
    }
    catch(err){
        res.status(404).send({msg:"Company already removed"});
    }
}*/

module.exports = {updateCompany,addCompany,getOneCompany,getCurrentCompany,getAllcompanies}
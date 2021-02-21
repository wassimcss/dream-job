
const User = require("../models/user")
//block or deblock a user
const blockUser = async(req,res) => {
    const blockedUser = await User.findOneAndUpdate({_id:req.params.id},{$set:{block:req.body.block}},{ new: true, useFindAndModify: false })
    try{
        res.send(blockedUser)
    }
    catch(err){
        res.status(400).send(err)
    }

}

// get All users
const getAllUsers = async (req,res) => {
    const users = await User.find({})
    try{
        res.send(users)
    } 
    catch(err){
        res.status(400).send(err)
    }   
}

module.exports = {blockUser,getAllUsers}
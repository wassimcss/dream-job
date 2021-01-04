const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        trim:true
    },
    category: {
        type: String,
        required: true,
        trim:true
    },
    role: {
        type: String,
        default: "Job Seeker",
        enum: ["Job Seeker","Company","Admin"]
    },
    roleType : {
        type: String,
        default: "User",
        enum: ["User","Admin"]
    },
    block : {
        type : Boolean,
        default:false,
        required:true
    }

});
module.exports = mongoose.model("User", userSchema);

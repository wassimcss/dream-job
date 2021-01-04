const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employeeSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    profession:{
        type : String,
        required : true,
    },
    email : {
        type : String,
        required :true
    },
    age : {
        type : Number,
        required : false
    },
    phone : {
        type : Number,
        required : true
    },
    field : {
        type : String,
        required : false
    },
    address :{
        type : String,
        required :false
    },
    college:{
        type :String,
        required : false
    },
    highSchool : {
        type : String,
        required : false
    },
    experience : {
        type :String,
        required : false
    },
    traineeship : {
        type : String,
        required : false
    },
    image:{
        type:String,
        default:"uploads\\1609259479278.jpg",
        required:false,
        
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

});
module.exports = mongoose.model("Employee",employeeSchema);

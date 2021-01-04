const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const companySchema = mongoose.Schema({
    name : {
        type : String,
        required : false
    },
    email : {
        type : String,
        required :false
    },
    phone : {
        type : Number,
        required :false
    },
    field : {
        type : String,
        required : false
    },
    address :{
        type : String,
        required :false
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
module.exports = mongoose.model("Company",companySchema);

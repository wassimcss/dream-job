const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const jobSchema = mongoose.Schema(
  {
    job: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    contrat: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone:{
      type:String,
      required:true
    },
    field:{
      type:String,
      required:true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    condidats : [{type:Schema.Types.ObjectId , ref:"User"}]
  },
  { timestamps: true }
);
module.exports = mongoose.model("Job", jobSchema);

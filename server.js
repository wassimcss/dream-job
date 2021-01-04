const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose")
require('dotenv').config({path:"./config/.env"})
const companiesRoute = require("./routes/companies")
const jobsRoute = require("./routes/jobs")
const employeesRoute = require("./routes/employees")
const authUser = require("./routes/authUser")
const adminControls = require("./routes/admin")

const app = express()
//use middlware
app.use(express.json());
app.use(cors())
app.use("/uploads",express.static("uploads"))
app.use("/api/jobs",jobsRoute);
app.use("/api/employees",employeesRoute);
app.use("/api/companies",companiesRoute);
app.use("/user",authUser);
app.use("/admin",adminControls)

// conenction  to database 
mongoose.connect(process.env.db_uri1, {useNewUrlParser: true, useUnifiedTopology: true} , (err) => {
  if (err) console.log(err)
  else console.log("connected to database")
});


const port = process.env.PORT || 5000
app.listen(port,(err) => {
    if (err) console.log(err)
    console.log(`server is running on port ${port}`)
})
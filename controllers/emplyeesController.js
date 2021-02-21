const Employee = require("../models/Employee");

const { registerValidation } = require("../validation/employeeValidation");

//get current employee
const getCurrentEmployee = (req, res) => {
  Employee.findOne({ user: req.user._id })
    .then((profile) => {
      if (!profile) return res.status(404).send({ msg: "no profile" });
      else res.send(profile);
    })
    .catch((err) => res.status(400).send(err));
};

//Get all employees
const getAllemployees = async (req, res) => {
  const employees = await Employee.find();
  try {
    res.send(employees);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Get one  employee
const getOneEmployee = async (req, res) => {
  const employee = await Employee.find({ _id: req.params.id });
  try {
    res.send(employee);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Post a employee
const addEmployee = async (req, res) => {
  // let validate a emlpoyee
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ msg: error.details[0].message });
  // let verify email existance
  const employee = await Employee.findOne({ email: req.body.email });
  if (employee) return res.status(400).send({ msg: "verify your email" });
  // add new new Employee
  const newEmployee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profession: req.body.profession,
    email: req.body.email,
    age: req.body.age,
    phone: req.body.phone,
    field: req.body.field,
    address: req.body.address,
    college: req.body.college,
    highSchool: req.body.highSchool,
    experience: req.body.experience,
    traineeship: req.body.traineeship,
    user: req.params.user_id,
  });
  if (req.file) {
    newEmployee.image = req.file.path
}
  const savedEmployee = await newEmployee.save();

  res.send(savedEmployee);
};

//update a employee
const updateEmployee = async (req, res) => {
  // let validate a emlpoyee
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ msg: error.details[0].message });
  
  const updatedEmployee = await Employee.findOneAndUpdate(
    { user: req.params.user_id },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profession: req.body.profession,
        email: req.body.email,
        age: req.body.age,
        phone: req.body.phone,
        field: req.body.field,
        address: req.body.address,
        college: req.body.college,
        highSchool: req.body.highSchool,
        experience: req.body.experience,
        traineeship: req.body.traineeship,
        
      },
    },
    { new: true, useFindAndModify: false }
  );
  if (req.file) {
    updatedEmployee.image = req.file.path
}

  try {
    res.send(updatedEmployee);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Delete a employee
/*const deleteEmployee = async (req, res) => {
    const removedEmployee = await Employee.findOne({ _id: req.params.id })
    try {
        await removedEmployee.remove();
        res.send({ alert: "Employee is removed" })
    }
    catch (err) {
        res.status(404).send({ msg: "Employee already removed" });
    }
}*/

module.exports = {
  getAllemployees,
  getOneEmployee,
  addEmployee,
  updateEmployee,
  getCurrentEmployee,
};

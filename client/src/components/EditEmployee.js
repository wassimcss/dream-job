import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { editEmployee } from "../actions/employeeAction";

import { clearError } from "../actions/errorActions";
import { EmployeeInfo } from "./EmployeeInfo";
import {employeeSchema} from '../validation/jobValidation';

export const EditEmployee = (props) => {
  const curr_user = useSelector((state) => state.authReducer.user);
  const employee = useSelector((state) => state.employeeReducer.employee);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.errorReducer);
  const errorForm = error._id;
  const [firstName, setFirstName] = useState(employee.firstName);
  const [lastName, setLastName] = useState(employee.lastName);
  const [profession, setProfession] = useState(employee.profession);
  const [email, setEmail] = useState(employee.email);
  const [age, setAge] = useState(employee.age);
  const [field, setField] = useState(employee.field);
  const [phone, setPhone] = useState(employee.phone);
  const [address, setAddress] = useState(employee.address);
  const [college, setCollege] = useState(employee.college);
  const [highSchool, setHighSchool] = useState(employee.highSchool);
  const [experience, setExperience] = useState(employee.experience);
  const [traineeship, setTraineeship] = useState(employee.traineeship);
  const [isedited, setIsEdited] = useState(false)
  const [file, setFile] = useState();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("profession", profession);
    formData.append("email", email);
    formData.append("age", age);
    formData.append("field", field);
    formData.append("phone", phone.toString());
    formData.append("address", address);
    formData.append("college", college);
    formData.append("highSchool", highSchool);
    formData.append("experience", experience);
    formData.append("traineeship", traineeship);
    if (file) {formData.append("image", file )}
    dispatch(
      editEmployee(curr_user._id, formData)
    );
    
    var isValid = await employeeSchema.isValid({firstName,lastName,profession,email,age,field,phone: phone.toString(),address,college,highSchool,experience,traineeship})
    if (!isValid) {
      setIsEdited(false);
    } else {
    dispatch(clearError());
    setIsEdited(true)
    }
    
  };
  return (
    <div>
      {isedited ? <EmployeeInfo/>:
      <div className="container">
      <h1>Build your own resume</h1>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Row>
          <Form.Group className="col-6" as={Col}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              value={firstName}
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} className="col-6">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              value={lastName}
              type="text"
              name="lastName"
              placeholder="Enter your last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Age</Form.Label>
            <Form.Control
              value={age}
              type="number"
              placeholder="your age"
              name="age"
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>profession</Form.Label>
            <Form.Control
              value={profession}
              placeholder="profession"
              name="profession"
              onChange={(e) => setProfession(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>field</Form.Label>
            <Form.Control
              value={field}
              placeholder="your field"
              name="field"
              onChange={(e) => setField(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              placeholder="your adress"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>phone</Form.Label>
            <Form.Control
              value={phone}
              placeholder="phone Number"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>College</Form.Label>
            <Form.Control
              value={college}
              placeholder="your college"
              name="college"
              onChange={(e) => {
                setCollege(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>High School</Form.Label>
            <Form.Control
              value={highSchool}
              placeholder="your highScool"
              name="highSchool"
              onChange={(e) => {
                setHighSchool(e.target.value);
              }}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Label>Traineeship</Form.Label>
          <Form.Control
            value={traineeship}
            placeholder="Traineeship"
            name="traineeship"
            onChange={(e) => setTraineeship(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Experience</Form.Label>
          <Form.Control
            value={experience}
            placeholder="your experience"
            name="experience"
            onChange={(e) => {
              setExperience(e.target.value);
            }}
          />
        </Form.Group>
        <div className="form-group mb-4">
              <label htmlFor="file">choose profile image</label><br/>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

        <button className="btn-primary" type="submit">
          Submit
        </button>
        {errorForm === "EDIT_EMPLOYEE_ERROR" ? (
          <div className="alert alert-danger">{error.msg.msg}</div>
        ) : null}
      </Form>
    </div>
      }
    </div>
  );
};

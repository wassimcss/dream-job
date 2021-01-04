import React, { useState } from "react";
import { Footer } from "./Footer";
import { NavbarPage } from "./NavbarPage";
import { add_job } from '../actions/actions'
import {useSelector , useDispatch} from 'react-redux'
import { clearError } from "../actions/errorActions";

import {jobSchema} from '../validation/jobValidation';


export const AddOffer = (props) => {
  
  const user = useSelector(state => state.authReducer.user)
  const error = useSelector(state => state.errorReducer)
  const [job, setJob] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [field, setField] = useState("");
  const [contrat, setContrat] = useState("");
  const [salary, setSalary] = useState("");
  const [phone, setPhone] = useState("");
  
 
 
  const dispatch = useDispatch()
 
  const handleSubmit = async(e) => {
    e.preventDefault();
  
    const newjob = {job,company,email,description,address,field,contrat,salary,phone}
    var isValid = await jobSchema.isValid(newjob)
    dispatch(add_job(user._id,newjob))
    if (isValid) {
      dispatch(clearError())
      props.history.push("/profile")
    }
    
  }
  
  return (
    <div>
       <div>
        <NavbarPage />
      <div className="container mt-3 mb-2">
          <h3> Add new offer </h3>
        <form className="form-group">
          <div className="form-row">
            <div className="col-md-6">
              <label htmlFor="title">Offer:</label>
              <input
                value={job}
                type="text"
                name="title"
                className="form-control"
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="title">Company:</label>
              <input
                value={company}
                className="form-control"
                type="text"
                name="rate"
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>
          <br/>

          <label htmlFor="title">Description:</label>
          <input
            value={description}
            className="form-control"
            type="text"
            name="posterUrl"
            onChange={(e) => setDescription(e.target.value)}
          />
          <br/>
          <div className="form-row">
            <div className="col-md-6">
              <label htmlFor="title">Phone:</label>
              <input
                value={phone}
                className="form-control"
                type="text"
                name="posterUrl"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="title">Field:</label>
              <input
                value={field}
                className="form-control"
                type="text"
                name="posterUrl"
                onChange={(e) => setField(e.target.value)}
              />
            </div>
          </div>
          <br/>
          <div className="form-row">
            <div className="col-md-6">
              <label htmlFor="title">Address:</label>
              <input
                value={address}
                className="form-control"
                type="text"
                name="posterUrl"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="title">Contrat:</label>
              <input
                value={contrat}
                className="form-control"
                type="text"
                name="contrat"
                onChange={(e) => setContrat(e.target.value)}
              />
            </div>
          </div>
          <br/>
          <div className="form-row">
            <div className="col-md-4">
              <label htmlFor="title">Salary:</label>
              <input
                value={salary}
                className="form-control"
                type="number"
                name="salary"
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div className="col-md-8">
              <label htmlFor="title">Rh email:</label>
              <input
                value={email}
                className="form-control"
                type="text"
                name="posterUrl"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn-primary" onClick={handleSubmit}>Add </button>
          {error._id === "OFFER_ERROR" ? (
              <div className="alert alert-danger ml-5 col-md-8  ">
                {error.msg.msg}
              </div>
            ) : null}
        </form>
      </div>
      <Footer />
      </div>
    </div>
  );
};

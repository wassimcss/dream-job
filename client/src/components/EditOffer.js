import React, { useState , useEffect  } from "react";
import { Footer } from "./Footer";
import { NavbarPage } from "./NavbarPage";
import { edit_job, get_jobs } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { clearError } from "../actions/errorActions";

import {jobSchema} from '../validation/jobValidation';

import { Redirect } from "react-router";
export const EditOffer = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get_jobs())
       
    }, [dispatch])

  const jobs = useSelector((state) => state.jobReducer.jobs) 
  const curr_job = jobs.find(job => job._id === props.match.params.id)
 
  const error = useSelector((state) => state.errorReducer);
  const [job, setJob] = useState(curr_job ? curr_job.job : "");
  const [company, setCompany] = useState(curr_job ?curr_job.company : "");
  const [email, setEmail] = useState(curr_job ? curr_job.email : "");
  const [description, setDescription] = useState(curr_job ? curr_job.description : "");
  const [address, setAddress] = useState(curr_job  ? curr_job.address : "");
  const [field, setField] = useState(curr_job ? curr_job.field : "");
  const [contrat, setContrat] = useState(curr_job ? curr_job.contrat : "");
  const [salary, setSalary] = useState(curr_job ? curr_job.salary : "");
  const [phone, setPhone] = useState(curr_job ? curr_job.phone : "");
  const [isEdit, setIsEdit] = useState(false);
  
  
  
  const handleSubmit =async (e) => {
    e.preventDefault();
    const newjob = {job,company,email,description,address,field,contrat,salary,phone:phone.toString()}
    var isValid = await jobSchema.isValid(newjob)
    dispatch(
      edit_job(curr_job._id, newjob)
    );
    if (!isValid )
    {
      setIsEdit(false);
    }
    else {
      setIsEdit(true);
      dispatch(clearError());
      props.history.push("/profile")
    }
    
  };

  return (
    <div>
      <NavbarPage />
      {
        (isEdit ) ? <Redirect to="/profile"/>:
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
          <br />

          <label htmlFor="title">Description:</label>
          <input
            value={description}
            className="form-control"
            type="text"
            name="posterUrl"
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
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
                required
              />
            </div>
          </div>
          <br />
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
          <br />
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
          <button className="btn btn-primary" onClick={handleSubmit}>
            Add{" "}
          </button>
          {error._id === "EDIT_ERROR" ? (
            <div className="alert alert-danger ml-5 col-md-8  ">
              {error.msg.msg}
            </div>
          ) : null}
        </form>
      </div>
      }
      <Footer />
    </div>
  );
};

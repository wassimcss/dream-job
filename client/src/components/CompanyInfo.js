import React, { useState } from "react";

import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { editCompany } from "../actions/companiesActions";
import { clearError } from "../actions/errorActions";
import { CompanyJobs } from "./CompanyJobs";
import "../companyInfo.css";

import {companySchema} from '../validation/jobValidation';

export const CompanyInfo = () => {
  const auth = useSelector((state) => state.authReducer.isAuth);
  const [isEdit, setIsEdit] = useState(false);
  const company = useSelector((state) => state.companyReducer.company);
  const curr_user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.errorReducer);
  const [name, setName] = useState(company.name);
  const [email, setEmail] = useState(company.email);
  const [phone, setPhone] = useState(company.phone);
  const [address, setAddress] = useState(company.address);
  const [field, setField] = useState(company.field);

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newcompany = {name,email,phone:phone.toString(),field,address}
    dispatch(
      editCompany(curr_user._id, newcompany)
    );
    
    var isValid = await companySchema.isValid(newcompany)
    if (!isValid) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
      dispatch(clearError());
    }
  };

  return (
    <div>
      {!isEdit && auth ? (
        <div className="container-fluid px-0 mt-2">
          <div className="profile">
            <div className="col-md-4 leftpart">
              <div className="left-det">
                <img
                  className="profileImg"
                  src={company.image}
                  alt=""
                />
                <h4>
                  <br />
                  {company.name}{" "}
                </h4>
                <div>
                <div className="btns">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <Link to="/newoffer">
                    {" "}
                    <button className="btn btn-success btn-sm">
                      Add Offer
                    </button>
                  </Link>
                </div>
              </div>
              </div>
            </div>
            <div>
              <h6>Information</h6>
              <div className="info">
                <div className="col-lg-9">
                  <b>Email : </b>
                  <br />
                  {company.email}
                </div>
                <div className="col-lg-6">
                  <b>field : </b>
                  <br />
                  {company.field}
                </div>
              </div>
              <h6>Contact</h6>
              <div className="info">
                <div className="col-md-9">
                  <b>Phone : </b>
                  <br />
                  {company.phone}
                </div>
                <div className="col-md-9">
                  <b>Address : </b> <br />
                  {company.address}
                </div>
              </div>
             
            </div>
          </div>

          <CompanyJobs />
        </div>
      ) : (
        <div>
          <Form onSubmit={handleSubmit} style={{ marginTop: "50px" }}>
            <h2 className="col-md-5" style={{ marginBottom: "30px" }}>
              Your company profile{" "}
            </h2>
            <Form.Group className="form-inline">
              <Form.Label className="col-md-1"> Name</Form.Label>
              <Form.Control
                className="col-md-6"
                value={name}
                type="text"
                placeholder="Enter your  name"
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="form-inline">
              <Form.Label className="col-md-1">Email</Form.Label>
              <Form.Control
                className="col-md-6"
                value={email}
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="form-inline">
              <Form.Label className="col-md-1">Phone</Form.Label>
              <Form.Control
                className="col-md-6"
                value={phone}
                type="text"
                placeholder="Enter your phone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="form-inline">
              <Form.Label className="col-md-1">Field</Form.Label>
              <Form.Control
                className="col-md-6"
                value={field}
                type="text"
                placeholder="Enter your field"
                name="field"
                onChange={(e) => setField(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="form-inline">
              <Form.Label className="col-md-1">Address</Form.Label>
              <Form.Control
                className="col-md-6"
                value={address}
                type="text"
                placeholder="Enter your address"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <button
              onClick={handleSubmit}
              style={{ marginLeft: "660px" }}
              type="button"
              className="btn btn-primary  mb-5 mt-3 "
            >
              Submit
            </button>

            {error._id === "COMPANY_ERROR" ? (
              <div className="alert alert-danger ml-5 col-md-6  ">
                {error.msg.msg}
              </div>
            ) : null}
          </Form>
        </div>
      )}
    </div>
  );
};

import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { addCompany } from "../actions/companiesActions";
import { clearError } from "../actions/errorActions";
import { CompanyInfo } from "./CompanyInfo";
import { Footer } from "./Footer";
import { NavbarPage } from "./NavbarPage";

export const FormComp = () => {
  const company = useSelector((state) => state.companyReducer.company);
  const curr_user = useSelector((state) => state.authReducer.user);
  const auth = useSelector((state) => state.authReducer.isAuth);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.errorReducer);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [field, setField] = useState("");
  const [file, setFile] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("field", field);
    if (file) {formData.append("image", file )}

    dispatch(addCompany(curr_user._id, formData));
    dispatch(clearError());
  };

  return (
    <div style={{ height: "400px" }}>
      <NavbarPage />
      {company && auth ? (
        <CompanyInfo />
      ) : (
        <div>
          <Form
            onSubmit={handleSubmit}
            style={{ marginTop: "50px" }}
            encType="multipart/form-data"
          >
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
                onChange={(e) => setName(e.target.value)}
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
                type="ptext"
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
       
            <div className="form-group mb-4">
              <label htmlFor="file">choose profile image</label><br/>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            
            <button
              type="submit"
              style={{ marginLeft: "660px" }}
              className="btn btn-md btn-primary  mb-2 mt-1 "
            >
              Submit
            </button>
            {error._id === "COMPANY_ERROR" ? (
              <div className="alert alert-danger ml-5 col-md-6 mt-0  ">
                {error.msg.msg}
              </div>
            ) : null}
          </Form>
        </div>
      )}
      <Footer />
    </div>
  );
};

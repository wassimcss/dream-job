import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
//import { Redirect } from "react-router";
import { registerUser } from "../actions/authUserActions";
import { clearError } from "../actions/errorActions";

import { Footer } from "./Footer";
import { NavbarPage } from "./NavbarPage";

export const RegisterForm = (props) => {
  const user = useSelector((state) => state.authReducer.user);
  const auth = useSelector((state) => state.authReducer.isAuth);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.errorReducer);
  const  nameRef  = useRef();
  const emailRef = useRef()
  const passwordRef = useRef()
  const categoryRef= useRef()
  const buttonRef = useRef()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [category, setCategory] = useState("")
  

  
  useEffect(() => {
    nameRef.current.focus();
  }, []);
  useEffect(() => {
    if (auth === true) {
      if(user.role === "Company") {return props.history.push("/profile");}
      else props.history.push("/jobs");

      dispatch(clearError());
    }
  }, [auth, dispatch, props,user]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({name,email,password,category}));
    if (auth) {
        setName("")
        setEmail("")
        setPassword("")
        setCategory("")
        dispatch(clearError())
    }
  };

  return (
    <div style={{ height: "400px" }}>
      <NavbarPage />
      <div className="row mb-0 mt-0">
        <img
          style={{ height: "600px", marginBottom: "-26px" }}
          className="col-md-7"
          src="https://www.monster.fr/recruter/conseil-en-ressources-humaines/wp-content/uploads/sites/13/2019/05/e53ad853b2ece39e4dc566f728b95493.png"
          alt=""
        />

        <Form
          onSubmit={handleSubmit}
          className="col-md-4"
          style={{ marginTop: "50px" }}
        >
          <h1 style={{ textAlign: "center" }}>Registre to Dreamjob</h1>
          <Form.Group>
            <Form.Label> Name</Form.Label>
            <Form.Control
              value={name}
              ref = {nameRef}
              onKeyDown={(e) =>
                e.key === "Enter" ? emailRef.current.focus() : null
              }
              type="text"
              placeholder="Enter your  name"
              name="name"
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              ref = {emailRef}
              onKeyDown={(e) =>
                e.key === "Enter" ? passwordRef.current.focus() : null
              }
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              ref = {passwordRef}
              onKeyDown={(e) =>
                e.key === "Enter" ? categoryRef.current.focus() : null
              }
              type="password"
              placeholder="Password"
              name="password"
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              ref = {categoryRef}
              onKeyDown={(e) =>
                e.key === "Enter" ? buttonRef.current.focus() : null
              }
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option defaultValue="company"></option>
              <option name="company" value="Company">
                Company
              </option>
              <option name="employee" value="Job Seeker">
                Job Seeker
              </option>
            </Form.Control>
          </Form.Group>
          <button
            onClick={handleSubmit}
            type="button"
            ref={buttonRef}
            className="btn btn-primary btn-lg btn-block"
          >
            Register
          </button>
          <br/>

          {error._id === "REGISTER_FAIL" ? (
            <div className="alert alert-danger">
              {error.msg.msg ? error.msg.msg : error.msg}
            </div>
          ) : null}
          
        </Form>
      </div>

      <Footer />
    </div>
  );
};

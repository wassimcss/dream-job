import React from "react";
import { Button, Form, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/authUserActions";
import { clear_company } from "../actions/companiesActions";
import { clear_employee } from "../actions/employeeAction";

export const NavbarPage = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer.isAuth);
  const currentUser = useSelector((state) => state.authReducer.user);


  const handleClick = () => {
    dispatch(logoutUser());
    if (currentUser.role === "Company") return dispatch(clear_company());
    if (currentUser.role === "Job Seeker") return dispatch(clear_employee());
   
  };
  const jobSeekerLinks = (
    <>
      <NavLink to="/resume" className="nav-link">
        resume
      </NavLink>
      <NavLink to="/companies" className="nav-link">
        companies
      </NavLink>
    </>
  );
  const companyLinks = (
    <>
      <NavLink to="/profile" className="nav-link">
        profile
      </NavLink>
      <NavLink to="/jobseekers" className="nav-link">
        resumes
      </NavLink>
    </>
  );
  const adminLinks = (
    <>
      <NavLink to="/userlist" className="nav-link">
        User List
      </NavLink>
    </>
  );
  const Links = auth
    ? currentUser.role === "Admin"
      ? adminLinks
      : currentUser.role === "Company"
      ? companyLinks
      : jobSeekerLinks
    : null;

  return (
    <div style={{ padding: "25px" }}>
      <Navbar bg="primary" variant="dark" className="fixed-top">
        <Navbar.Brand style={{color:"orange",marginTop:"-10px",marginRight:"30px",marginLeft:"30px",fontSize:"25px" ,fontFamily:"cursive", fontWeight:"bold"}} href="/">Dreamjob</Navbar.Brand>
        <Nav className="mr-auto">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/jobs" className="nav-link">
            Jobs
          </NavLink>
          {Links}
        </Nav>
        <Form inline>
          {!auth ? (
            <Nav>
              <NavLink
                to="/login"
                className="nav-link"
                style={{ color: "white" }}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="nav-link"
                style={{ color: "white" }}
              >
                Register
              </NavLink>
            </Nav>
          ) : (
            <div>
              <span style={{ color: "white" }}>Welcome {currentUser.name}</span>
              <NavLink to="/login">
                {" "}
                <Button variant="danger btn-sm" onClick={handleClick}>
                  Logout
                </Button>
              </NavLink>
            </div>
          )}
        </Form>
      </Navbar>
    </div>
  );
};

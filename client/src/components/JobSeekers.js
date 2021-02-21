import React, { useEffect,useState } from "react";
import  Pagination  from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { load_employees } from "../actions/employeeAction";
import { Footer } from "./Footer";
import { NavbarPage } from "./NavbarPage";
import {Spinner} from 'react-bootstrap'

export const JobSeekers = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load_employees());
  }, [dispatch]);
  const employees = useSelector((state) => state.employeeReducer.employees);
  const loading = useSelector((state) => state.employeeReducer.loading);
  const auth = useSelector((state) => state.authReducer.isAuth);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeePerPage] = useState(2);
  //Get current employees
  const indexOfLastJob = currentPage * employeePerPage;
  const indexOfFirstJob = indexOfLastJob - employeePerPage;
  const curr_employees = employees.slice(indexOfFirstJob, indexOfLastJob);
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div  style={{backgroundColor:" #E2E8F0"}}>
      <NavbarPage />
      {loading && auth ? (
         <Spinner
         style={{ marginLeft: "25rem", marginTop: "2rem" }}
         animation="border"
         role="status"
       >
         <span className="sr-only">Loading...</span>
       </Spinner>
      ) : (
        <div>
          {curr_employees.map((employee) => {
            return (
              <div className=" mt-1 cv ">
                <div className="left-part">
                  <img
                    className="profileImg"
                    src="https://png.pngtree.com/png-vector/20200614/ourlarge/pngtree-mask-vector-avatar-icon-image-png-image_2247197.jpg"
                    alt=""
                  />
                  <h5>{employee.firstName + " " + employee.lastName}</h5>
                  <b>{employee.email}</b>
                  <br />
                  <b>{employee.profession}</b>
                  <br />
                </div>
                <div className="right-part">
                  <p className="infos">
                    <b>Name : </b>
                    {employee.firstName + " " + employee.lastName}
                  </p>
                  <p className="infos">
                    <b>Age : </b>
                    {employee.age}
                  </p>
                  <p className="infos">
                    <b>Email : </b>
                    {employee.email}
                  </p>

                  <p className="infos">
                    <b>Field : </b>
                    {employee.field}
                  </p>
                  <p className="infos">
                    <b>Address : </b>
                    {employee.address}
                  </p>
                  <p className="infos">
                    <b>Phone : </b>
                    {employee.phone}
                  </p>
                  <p className="infos">
                    <b>College : </b>
                    {employee.college}
                  </p>
                  <p className="infos">
                    <b>High School : </b>
                    {employee.highSchool}
                  </p>
                  <p className="infos">
                    <b>Trainesheep : </b>
                    {employee.traineeship}
                  </p>
                  <p className="infos">
                    <b>Experience : </b>
                    {employee.experience}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Pagination
        paginate={paginate}
        itemPerPage={employeePerPage}
        totalitems={employees.length}
        currentPage={currentPage}
      />
      <Footer />
    </div>
  );
};

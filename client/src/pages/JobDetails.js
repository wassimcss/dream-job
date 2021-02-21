import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { get_jobs } from "../actions/actions";
import { Footer } from "../components/Footer";
import { NavbarPage } from "../components/NavbarPage";
import "../jobdetails.css";

export const JobDetails = (props) => {
  var dateFormat = require("dateformat");
  const jobs = useSelector((state) => state.jobReducer.jobs);
  const auth = useSelector((state) => state.authReducer.isAuth);
  const user = useSelector((state) => state.authReducer.user);

  let dispatch = useDispatch();
  const id = props.match.params.id;
  useEffect(() => {
    dispatch(get_jobs());
  }, [dispatch]);
  let job = jobs.find((el) => el._id === id);

  return (
    <div className="jobdetails">
      {auth ? (
        <div>
          <NavbarPage />
          <div className="jobd">
            <div className="aa">
              <div>
                <div className="comp">
                  {" "}
                  <b>Company :</b>
                  {job.company}
                </div>
                <div className="offre">
                  <b style={{ color: "black" }}>Poste : </b>
                  {job.job}
                </div>
                <div className="description">
                  <b>Description : </b>
                  {job.description}
                </div>
                <div className="description">
                  <b>Salary : </b>
                  {job.salary} TND
                </div>
                <div className="description">
                  <b>Field : </b>
                  {job.field}
                </div>
                <div className="description">
                  <b>Email : </b>
                  {job.email}
                </div>
                <div className="description">
                  <b>Phone : </b>
                  {job.phone}
                </div>
                <div className="description">
                  <b>Address : </b>
                  {job.address}
                </div>
                <div className="description">
                  <b>Contrat : </b>
                  {job.contrat}
                </div>
              </div>
              {user.role === "Job Seeker" ? (
                <Link to={`/apply/${job._id}`}>
                  <button className="btn btn-warning mr-5">Apply</button>
                </Link>
              ) : null}
            </div>
            <div className="items">
              <div className="item">
                <i className="fas fa-file-contract"></i>
                <div className="address">{job.contrat}</div>
              </div>
              <div className="item">
                <i className="fas fa-map-marker-alt "></i>
                <div className="address"> {job.description}</div>
              </div>
              <div className="item">
                <i class="fas fa-calendar-alt"></i>
                <div className="address">
                  {" "}
                  {dateFormat(job.createdAt, "mediumDate")}
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

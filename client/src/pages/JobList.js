import { useSelector, useDispatch } from "react-redux";

import { delete_job, getOneJob } from "../actions/actions";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { NavbarPage } from "../components/NavbarPage";
import { Footer } from "../components/Footer";
import "../joblist.css";
import { load_user } from "../actions/authUserActions";
import Pagination from "../components/Pagination";

export const JobList = (props) => {
  const auth = useSelector((state) => state.authReducer.isAuth);
  var dateFormat = require("dateformat");
  let dispatch = useDispatch();
  useEffect(() => {
    load_user();
  }, []);
  const user = useSelector((state) => state.authReducer.user);
  const admin = auth ? (user.role === "Admin" ? true : false) : null;

  const jobs = useSelector((state) => state.jobReducer.jobs);
  const viewDetails = (id) => {
    if (auth) {
      dispatch(getOneJob(id));
    }
    props.history.push("/login");
  };

  const DeleteJob = (id) => {
    const confirm = window.confirm("Do you really want to block this offer?");
    if (confirm === true) {
      dispatch(delete_job(id));
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [jobPerPage] = useState(3);
  //Get current jobs
  const indexOfLastJob = currentPage * jobPerPage;
  const indexOfFirstJob = indexOfLastJob - jobPerPage;
  const curr_jobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="joblistg">
      <NavbarPage />
      <div className="joblist">
        {curr_jobs.map((job) => {
          return (
            <div key={job._id} className="job">
              <div>
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
                  </div>
                  <div className="hh">
                    <Link to={`job/${job._id}`}>
                      <button
                        style={{ width: "100px" }}
                        className="btn btn-md primary btn-outline-primary "
                        onClick={() => viewDetails(job._id)}
                      >
                        View
                      </button>
                    </Link>{" "}
                    <br />
                    {admin ? (
                      <button
                        style={{ width: "100px" }}
                        className="btn btn-sm primary btn-outline-danger "
                        onClick={() => DeleteJob(job._id)}
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
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
            </div>
          );
        })}
      </div>
      <Pagination
        paginate={paginate}
        itemPerPage={jobPerPage}
        totalitems={jobs.length}
        currentPage={currentPage}
      />
      <Footer />
    </div>
  );
};

import { useSelector, useDispatch } from "react-redux";
import React from "react";

import { Link } from "react-router-dom";
import { delete_job, getOneJob } from "../actions/actions";

export const CompanyJobs = () => {
  
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobReducer.jobs);
  const id = useSelector((state) => state.authReducer.user._id);
  var dateFormat = require("dateformat");
  const DeleteJob = (id) => {
    const confirm = window.confirm("Do you really want to block this offer?");
    if (confirm === true) {
      dispatch(delete_job(id));
    }
  };

  return (
    <div>
      <div className="container mb-3">
        {jobs
          .filter((job) => job.user === id)
          .map((job) => {
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
                      <Link to={`editoffer/${job._id}`}>
                        <button
                          style={{ width: "100px" }}
                          className="btn btn-sm btn-outline-primary "
                          onClick={() => dispatch(getOneJob(job._id))}
                        >
                          Edit
                        </button>
                        <br />
                      </Link>

                      <button
                        style={{ width: "100px" }}
                        className="btn btn-sm primary btn-outline-danger "
                        onClick={() => DeleteJob(job._id)}
                      >
                        Delete
                      </button>
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
    </div>
  );
};

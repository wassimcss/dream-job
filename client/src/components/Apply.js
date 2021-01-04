import React, { useState,useEffect } from "react";
//import { clearError } from "../actions/errorActions";
import { useDispatch, useSelector } from "react-redux";
import { apply_job, getOneJob } from "../actions/actions";
import { NavbarPage } from "./NavbarPage";
import { Footer } from "./Footer";

export const Apply = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id
  useEffect(() => {
    dispatch(getOneJob(id))
    
  }, [id,dispatch])
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();
  
  const curr_job = useSelector((state) => state.jobReducer.job);
  const curr_user = useSelector((state) => state.authReducer.user);
  const error = useSelector((state) => state.errorReducer);
  console.log(curr_job._id);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("message", message);
    formData.append("user_id", curr_user._id);
    if (file) {
      formData.append("cv", file);
    }

    const isExist = curr_job.condidats.find((el) => el === curr_user._id);
    dispatch(apply_job(curr_job._id, formData));
    if (!isExist) {
      props.history.push("/jobs");
    }
  };

  return (
    <div>
      <NavbarPage />
      <div className="container">
        <h3>Apply now</h3>
        <form
          className="form-group"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Enter your Name </label>
          <input
            type="text"
            name="name"
            placeholder="Job seeker name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="message">Enter your message </label>
          <textarea
            placeholder="write message ..."
            name="message"
            className="form-control"
            id=""
            cols="30"
            rows="10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <br />
          <div className="form-group mb-4">
            <label htmlFor="cv">upload your resume</label>
            <br />
            <input
              type="file"
              name="cv"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button className="btn-danger btn-md btn-block" type="submit">
            Submit
          </button>
          {error._id === "APPLY_ERROR" ? (
            <div className="alert alert-danger ml-5 col-md-8 mt-0  ">
              {error.msg.msg}
            </div>
          ) : null}
        </form>
      </div>
      <Footer />
    </div>
  );
};

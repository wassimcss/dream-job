import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../actions/authUserActions";
import { clearError } from "../actions/errorActions";

import { Redirect } from "react-router";

export const LogAdmin = (props) => {
  const auth = useSelector((state) => state.authReducer.isAuth);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.errorReducer);
  useEffect(() => {
    if (auth === true) {
      setUser({
        email: "",
        password: "",
      });
      dispatch(clearError());
    }
  }, [auth, dispatch]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin(user));
    if (auth) {
      props.history.push("/");
      setUser({ email: "", password: "" });
    }
  };

  return (
    <div style={{ marginLeft: "500px", marginTop: "100px" }}>
      {auth ? <Redirect to="/" /> : null}
      <div className="container">
        <div className="row">
          <div className="col-md-6" md="5">
            <form onSubmit={handleSubmit}>
              <p className="h5 text-center mb-4"> Admin Sign in</p>
              <div className="grey-text">
                  <label htmlFor="email">Email</label>
                <input
                className="form-control"
                  
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                className="form-control mb-3"
                  
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
              <div className="text-center">
                <button className="btn btn-block btn-primary" onClick={handleSubmit}>Login</button>
                {error._id === "LOGIN_FAIL" ? (
                  <div className="alert alert-danger">{error.msg.msg}</div>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

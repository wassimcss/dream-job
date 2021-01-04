import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/authUserActions";
import { clearError } from "../actions/errorActions";
import { Footer } from "./Footer";
import { NavbarPage } from "./NavbarPage";

export const LoginEmp = (props) => {
  const auth = useSelector((state) => state.authReducer.isAuth);
  const user = useSelector((state) => state.authReducer.user)
  const dispatch = useDispatch();
  const error = useSelector((state) => state.errorReducer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const buttonRef = useRef();
  useEffect(() => {
    if (auth === true) {
      if(user.role === "Company") {return props.history.push("/profile");}
      else props.history.push("/jobs");

      dispatch(clearError());
    }
  }, [auth, dispatch, props,user]);
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
    if (auth === true) {
      setEmail("");
      setPassword("");
      dispatch(clearError());
    }
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <NavbarPage />
      <div className="row">
        <img
          style={{ height: "580px" }}
          className="col-md-7"
          src="https://blog.les-sherpas.co/wp-content/uploads/2019/03/rawpixel-653764-unsplash-e1552937295174.jpg"
          alt=""
        />
        <Form onSubmit={handleSubmit} className="col-md-4">
          <h1
            style={{
              textAlign: "center",
              marginBottom: "40px",
              marginTop: "40px",
            }}
          >
            Login to Dreamjob
          </h1>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              ref={emailRef}
              type="email"
              placeholder="Enter your email"
              onKeyDown={(e) =>
                e.key === "Enter" ? passwordRef.current.focus() : null
              }
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              ref={passwordRef}
              onKeyDown={(e) =>
                e.key === "Enter" ? buttonRef.current.focus() : null
              }
              type="password"
              name="password"
              placeholder="Enter your last Name"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <button
            ref={buttonRef}
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary btn-lg btn-block mt-5"
          >
            Login
          </button>
          <br/>
          {error._id === "LOGIN_FAIL" ? (
            <div className="alert alert-danger">{error.msg.msg}</div>
          ) : null}
        </Form>
      </div>
      <Footer style={{ marginTop: "0px" }} />
    </div>
  );
};

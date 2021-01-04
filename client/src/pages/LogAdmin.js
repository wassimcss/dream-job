import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { loginAdmin } from '../actions/authUserActions'
import { clearError } from '../actions/errorActions'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Redirect } from 'react-router';


export const LogAdmin = (props) => {
    const auth = useSelector(state => state.authReducer.isAuth)
    const dispatch = useDispatch();
    const error = useSelector(state => state.errorReducer)
    useEffect(() => {
        if (auth === true) {
            setUser({
                email: "",
                password: ""
            })
            dispatch(clearError())
        }

    }, [auth, dispatch])

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginAdmin(user))
        if (auth) {
            props.history.push("/")
            setUser({ email: "", password: "" })
            
        }
       
    }


    return (
        <div style={{marginLeft:"500px", marginTop:"100px"}} >
            {auth ? <Redirect to="/" /> : null}
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="5">
                        <form onSubmit={handleSubmit}>
                            <p className="h5 text-center mb-4"> Admin Sign in</p>
                            <div className="grey-text">
                                <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                                    success="right" name="email" value={user.email} onChange={handleChange} />
                                <MDBInput label="Type your password" icon="lock" group type="password" validate name="password" value={user.password} onChange={handleChange} />
                            </div>
                            <div className="text-center">
                                <MDBBtn onClick={handleSubmit}>Login</MDBBtn>
                                {
                                    error._id === "LOGIN_FAIL" ? <div className="alert alert-danger">{error.msg.msg}</div> : null
                                }
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

           
          
        </div>
    )
}


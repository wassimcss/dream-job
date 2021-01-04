import axios from 'axios'
import { AUTH_ERROR, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, USER_LOADING,LOGIN_SUCCESS, GET_ALL_USERS } from './Types'
import {getError} from './errorActions'
import { load_company } from './companiesActions'

//chek token and load employee
export const load_user =() =>(dispatch,getState) => {
    //loading employee
    dispatch({type:USER_LOADING})
    
    axios.get("/user",tokenConfig(getState))
    .then(res => {
        dispatch({
            type : USER_LOADED,
            payload : res.data
        })
    })
    .then(res => dispatch(load_company()))
    .catch (err => {
        dispatch(getError(err.response.data,err.response.status))
        dispatch({type:AUTH_ERROR})
    })
}

// register User
export const registerUser = ({name,email,password,category})=> dispatch =>{
    //set headers
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    // request body
    const body = JSON.stringify({name,email,password,category})
    // 
    axios.post("/user/register",body,config)
    .then(res => dispatch({type:REGISTER_SUCCESS,payload:res.data}))
    .catch(err => {
        dispatch(getError(err.response.data,err.response.status,"REGISTER_FAIL"));
        dispatch({type:REGISTER_FAIL});
    })
}

// Login user
export const loginUser = ({email,password})=> dispatch =>{
    //set headers
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    // request body
    const body = JSON.stringify({email,password})
    // 
    axios.post("/user/login",body,config)
    .then(res => dispatch({type:LOGIN_SUCCESS,payload:res.data}))
    .catch(err => {
        dispatch(getError(err.response.data,err.response.status,"LOGIN_FAIL"));
        dispatch({type:LOGIN_FAIL});
    })
}
//Login Admin
// Login user
export const loginAdmin = ({email,password})=> dispatch =>{
    //set headers
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    // request body
    const body = JSON.stringify({email,password})
    // 
    axios.post("/user/admin",body,config)
    .then(res => dispatch({type:LOGIN_SUCCESS,payload:res.data}))
    .catch(err => {
        dispatch(getError(err.response.data,err.response.status,"LOGIN_FAIL"));
        dispatch({type:LOGIN_FAIL});
    })
}

// Get All users
export const load_users = () =>(dispatch,getState) => {
    axios.get("/admin",tokenConfig(getState))
    .then(res => dispatch({type:GET_ALL_USERS,payload:res.data}))
    .catch(err => dispatch(getError(err.response.data,err.response.status)))
}

// Block User
export const block_User = (id,isBlock) =>(dispatch,getState) => {
    axios.put("/admin/"+id,isBlock,tokenConfig(getState))
    .then(res => dispatch(load_users()))
    .catch(err => dispatch(getError(err.response.data,err.response.status)))
}



// logout User
export const logoutUser = () => ({
    type: LOGOUT_SUCCESS
   
})


//setup token configuration
export const tokenConfig = (getState) => {
    // get token from loacalStorage
    const token = getState().authReducer.token
    // set header
    const config = {
        headers:{ "Content-type":"application/json"}
    }
    //add token to headers
    if (token) {
        config.headers["auth-token"] = token;
    }
    return config;
}
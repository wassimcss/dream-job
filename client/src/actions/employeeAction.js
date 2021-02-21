import axios from "axios";
import { tokenConfig } from "./authUserActions";
import { getError } from "./errorActions";
import { ADD_EMPLOYEE, EMPLOYEE_LOADED, EMPLOYEE_LOADING,EDIT_EMPLOYEE, CLEAR_CURRENT_EMPLOYEE, GET_ALL_EMPLOYEES } from "./Types";


//chek token and load job Seeker profile
export const load_employee = () => (dispatch, getState) => {
  //loading employee profile
  dispatch({ type: EMPLOYEE_LOADING });
  axios
    .get("/api/employees/profile", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: EMPLOYEE_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(getError(err.response.data, err.response.status));
    });
};

// load job seekers
export const load_employees = () => (dispatch, getState) => {
 
  axios
    .get("/api/employees/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ALL_EMPLOYEES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(getError(err.response.data, err.response.status));
    });
};


//ADD job seeker pofile
export const addEmployee = (id, newCompany) => (dispatch, getState) => {
  axios
    .post("/api/employees/profile/" + id, newCompany, tokenConfig(getState))
    .then((res) => dispatch({ type: ADD_EMPLOYEE, payload: res.data }))
    .catch((err) =>
      dispatch(
        getError(err.response.data, err.response.status, "EMPLOYEE_ERROR")
      )
    );
};
//EDIT EMPLOYEE
export const editEmployee = (id, editedValue) => (dispatch, getState) => {
  
  axios
    .put("/api/employees/profile/" + id, editedValue, tokenConfig(getState))
    .then((res) => dispatch({type:EDIT_EMPLOYEE,payload:res.data}))
    .catch((err) =>
    dispatch(
      getError(err.response.data, err.response.status, "EDIT_EMPLOYEE_ERROR")
    )
  );
};

// clear current employee profile
export const clear_employee = () => ({
  type: CLEAR_CURRENT_EMPLOYEE,
  
})


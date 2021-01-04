import axios from "axios";
import { tokenConfig } from "./authUserActions";
import { getError } from "./errorActions";
import {
  ADD_COMPANY,
  COMPANY_LOADING,
  GET_ONE_COMPANY,
  COMPANY_LOADED,
  COMPANY_EDITED,
  CLEAR_CURRENT_COMPANY,
  GET_ALL_COMPANIES,
} from "./Types";

//chek token and load company profile
export const load_company = () => (dispatch, getState) => {
  //loading company profile
  dispatch({ type: COMPANY_LOADING });
  axios
    .get("/api/companies/profile", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: COMPANY_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(getError(err.response.data, err.response.status));
    });
};

//Get all companies
export const load_companies = () => (dispatch,getState) => {
  dispatch({ type: COMPANY_LOADING });
  axios.get("/api/companies",tokenConfig(getState))
  .then(res => dispatch({type: GET_ALL_COMPANIES,payload:res.data}))
  .catch(err => {
      dispatch(getError(err.response.data,err.response.status))
  })
}

//ADD company pofile
export const addCompany = (id, newCompany) => (dispatch, getState) => {
  axios
    .post("/api/companies/profile/" + id, newCompany, tokenConfig(getState))
    .then((res) => dispatch({ type: ADD_COMPANY, payload: res.data }))
    .catch((err) =>
      dispatch(
        getError(err.response.data, err.response.status, "COMPANY_ERROR")
      )
    );
};

export const editCompany = (id, newCompany) => (dispatch, getState) => {
  axios
    .put("/api/companies/profile/" + id, newCompany, tokenConfig(getState))
    .then((res) => dispatch({type:COMPANY_EDITED,payload:res.data}))
    .catch((err) => dispatch(getError(err.response.data, err.response.status,"COMPANY_ERROR")));
};

export const getCompany = (id) => (dispatch, getState) => {
  axios
    .get("/api/companies/profile/", id, tokenConfig(getState))
    .then((res) => dispatch({ type: GET_ONE_COMPANY }))
    .catch((err) => dispatch(getError(err.response.data, err.response.status)));
};
//Clear Current company profile
export const clear_company = () => ({
  type: CLEAR_CURRENT_COMPANY
})

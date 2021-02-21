import axios from 'axios'
import { tokenConfig } from './authUserActions'
import { getError } from './errorActions'
import { ADD_JOB, DELETE_JOB, GET_ALL_JOBS, GET_COMPANY_JOBS, GET_ONE_JOB } from './Types'

// Get all jobs
export const get_jobs = () => dispatch => {
    axios.get("/api/jobs")
    .then(res => dispatch({type: GET_ALL_JOBS,payload:res.data}))
    .catch(err => {
        dispatch(getError(err.response.data,err.response.status))
    })
}
// Get company jobs
export const get_company_jobs = (id) => (dispatch,getState) => {
    axios.get("/api/companies/jobs/"+id,tokenConfig(getState))
    .then(res => dispatch({type: GET_COMPANY_JOBS,payload:res.data}))
    .catch(err => {
        dispatch(getError(err.response.data,err.response.status))
    })
}
//Get One job
export const getOneJob = (id) => (dispatch,getState) => {
        axios.get("/api/jobs/"+id,tokenConfig(getState))
        .then (res => dispatch({type : GET_ONE_JOB,payload:res.data}))
        .catch(err => dispatch(getError(err.response.data,err.response.status)))
}
//addJob
export const add_job = (id,newJob) => (dispatch,getState) =>  {
    console.log(newJob)
    axios.post("/api/companies/newjob/"+id,newJob,tokenConfig(getState))
    .then (res => dispatch({type:ADD_JOB,payload:res.data}))
    .catch(err => dispatch(getError(err.response.data,err.response.status,"OFFER_ERROR")))
}
//Delete JOB
export const  delete_job = (id) =>(dispatch,getState) => {
    axios.delete("/api/companies/job/"+id,tokenConfig(getState))
    .then (res => dispatch({type:DELETE_JOB,payload:id}))
    .catch(err => dispatch(getError(err.response.data,err.response.status)))
}
//Edit Job
export const  edit_job = (id,newJob) => (dispatch,getState) => {
    axios.put("/api/companies/job/"+id,newJob,tokenConfig(getState))
    .then (res => dispatch(get_jobs()))
    .catch(err => dispatch(getError(err.response.data,err.response.status,"EDIT_ERROR")))
}
//aplly for a job
export const apply_job = (id,value) => (dispatch,getState) => {
    axios.post("/api/jobs/apply/"+id,value,tokenConfig(getState))
    .then(res => dispatch(get_jobs()))
    .catch(err => dispatch(getError(err.response.data,err.response.status,"APPLY_ERROR")))
}
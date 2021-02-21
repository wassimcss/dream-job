
import {  ADD_JOB, DELETE_JOB, EDIT_JOB, GET_ALL_JOBS, GET_COMPANY_JOBS, GET_ONE_JOB } from "../actions/Types";

const initialState = {
    jobs: [],
    job: {},
    loading:false
}

const jobReducer = (state = initialState, { type, payload }) => {
    switch (type) {
       
        case GET_COMPANY_JOBS:
            return {...state,jobs_company:payload,loading:false}

        case EDIT_JOB:
        case GET_ALL_JOBS:
            return { ...state, jobs: payload ,loading:false}
        
        case GET_ONE_JOB:
            return { ...state,job:payload , loading:false}
        case ADD_JOB :
            return{
                ...state,
                jobs:[...state.jobs,payload]
            }
        case DELETE_JOB:
            return{
                ...state,
                jobs:state.jobs.filter(job => job._id !==payload )
            }
       
       


        default:
            return state
    }
}
export default jobReducer;

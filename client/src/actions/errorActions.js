import { CLEAR_ERRORS, GET_ERRORS } from "./Types";

//GET Errors
export const getError = (msg,status,_id=null) => ({
    type: GET_ERRORS,
    payload : {msg , status , _id}
})

//CLEAR Errors
export const clearError = () => ({
    type: CLEAR_ERRORS
})


import {  ADD_EMPLOYEE, CLEAR_CURRENT_EMPLOYEE, EDIT_EMPLOYEE, EMPLOYEE_LOADED, EMPLOYEE_LOADING, GET_ALL_EMPLOYEES, GET_ONE_EMPLOYEE } from "../actions/Types";

const initialState = {
    employees: [],
    employee: null,
    loading:false
}

const employeeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case EMPLOYEE_LOADING:
            return { ...state, loading: true }
        case EDIT_EMPLOYEE:
        case EMPLOYEE_LOADED:
            return {
                ...state,
                loading: false,
                employee: payload
            }
        case GET_ALL_EMPLOYEES:
            return { ...state, employees: payload, loading: false }
        case GET_ONE_EMPLOYEE:
            return { ...state, employee: payload, loading: false }

        case ADD_EMPLOYEE:
            return {
                ...state,
                employees: [...state.employees, payload],
                loading:false,
                employee:{...payload}
            }
        
        case CLEAR_CURRENT_EMPLOYEE:
            return {
                ...state,
                employee:null
            }


        default:
            return state
    }
}
export default employeeReducer;

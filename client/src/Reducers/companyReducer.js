import { ADD_COMPANY, CLEAR_CURRENT_COMPANY, COMPANY_EDITED, COMPANY_LOADED, COMPANY_LOADING, GET_ALL_COMPANIES, GET_ONE_COMPANY } from "../actions/Types";

const initialState = {
    token: localStorage.getItem("token"),
    companies: [],
    company: null,
    loading: false
}

const companyReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case COMPANY_LOADING:
            return { ...state, loading: true }
        case COMPANY_EDITED:
        case COMPANY_LOADED:
            return {
                ...state,
                loading: false,
                company: payload
            }
        case GET_ALL_COMPANIES:
            return { ...state, companies: payload, loading: false }
        case GET_ONE_COMPANY:
            return { ...state, comapny: payload, loading: false }

        case ADD_COMPANY:
            return {
                ...state,
                companies: [...state.companies, payload],
                loading:false,
                company:{...payload}
            }
            case CLEAR_CURRENT_COMPANY:
                return {
                  ...state,
                  company: null
                };


        default:
            return state
    }
}
export default companyReducer;

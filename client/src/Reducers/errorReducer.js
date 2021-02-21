import { CLEAR_ERRORS, GET_ERRORS } from "../actions/Types"

const initialState = {
    msg: {},
    status: null,
    _id: null
}

const errorReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                _id: action.payload._id
            }


        case CLEAR_ERRORS:
            return {
                msg: {},
                status: null,
                id: null
            }

        default:
            return state
    }
}
export default errorReducer
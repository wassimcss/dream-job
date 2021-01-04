import {
  AUTH_ERROR,
  
  GET_ALL_USERS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING,
} from "../actions/Types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  isLoading: null,
  user: null,
  users: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, isLoading: true };

   
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuth: true,
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isLoading: false,
        isAuth: false,
        user: null,
      };
    
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
export default authReducer;

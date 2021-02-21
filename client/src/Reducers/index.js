import { combineReducers } from 'redux'
import jobReducer from './jobReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import employeeReducer from './employeeReducer'
import companyReducer from './companyReducer'

export default combineReducers({jobReducer , authReducer , errorReducer ,employeeReducer,companyReducer})
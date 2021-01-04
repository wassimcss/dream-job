
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home';
import { JobList } from './pages/JobList';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { JobDetails } from './pages/JobDetails';

import { useDispatch , useSelector } from 'react-redux'
import { useEffect } from 'react'

import { LoginEmp } from './components/LoginEmp';
import { RegisterForm } from './components/RegisterForm'
import { FormEmp } from './components/FormEmp'
import { load_user } from './actions/authUserActions';
import { LogAdmin } from './pages/LogAdmin';
import { FormComp } from './components/FormComp';
import {  load_company } from './actions/companiesActions';
import { load_employee } from './actions/employeeAction';
import { get_jobs } from './actions/actions';
import { AddOffer } from './components/AddOffer';
import { EditOffer } from './components/EditOffer';
import { Companies } from './components/Companies';
import { JobSeekers } from './components/JobSeekers';
import { UserList } from './components/UserList';
import { NotFound } from './pages/NotFound';
import { Apply } from './components/Apply';


function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.authReducer.isAuth)
  useEffect(() => {
    dispatch(get_jobs())
  }, [dispatch])
   
  useEffect(() => {
   
    dispatch(load_user())
    if (auth){
      dispatch(load_company())
      dispatch(load_employee())
     
    }
     
    
  }, [dispatch,auth])



  return (
    <div className="App">
      <Router>


       <Switch>
       <Route path="/" exact component={Home} />
        <Route path="/jobs" exact component={JobList} />
        <Route path="/job/:id" exact component={JobDetails} />
        <Route path="/login" exact component={LoginEmp} />
        <Route path="/register" exact component={RegisterForm} />
        <Route path="/resume" exact component={FormEmp} />
        <Route path="/admin" exact component={LogAdmin} />
        <Route path="/profile" exact component={FormComp} />
        <Route path="/newoffer" exact component={AddOffer} />
        <Route path="/editoffer/:id" exact component={EditOffer}/>
        <Route path="/companies" exact component={Companies} />
        <Route path="/jobseekers" exact component={JobSeekers}/>
        <Route path = "/userlist" exact component={UserList}/>
        <Route path = "/apply/:id" exact component={Apply}/>
        <Route exact component={NotFound}/>
       </Switch>
        

      </Router>
    </div>
  );
}

export default App;

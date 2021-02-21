import React , {useState} from "react";

import { useSelector } from 'react-redux'
import  '../employeeInfo.css'




import { EditEmployee } from "./EditEmployee";

export const EmployeeInfo = () => {
    const [isEdit, setIsEdit] = useState(false)
    const employee = useSelector(state => state.employeeReducer.employee)
   
    const handleEdit = (e) => {
        e.preventDefault()
        setIsEdit(true);
    
      };
  return (
    <div>
      {!isEdit ? (
        <div className=" mt-1 cv ">
          <div className="left-part">
            <img className="profileImg" src={employee.image} alt=""/>
            <h5>{employee.firstName + " " +employee.lastName}</h5>
            <b>{employee.email}</b><br/>
            <b>{employee.profession}</b><br/>
            <button className="btn btn-primary" onClick={handleEdit}>
            Edit
          </button>
          </div>
          <div className="right-part">
          <p className="infos">
            <b>Name : </b>
            {employee.firstName + " " +employee.lastName}
          </p>
          <p className="infos">
            <b>Age : </b>
            {employee.age}
          </p>
          <p className="infos">
            <b>Email : </b>
            {employee.email}
          </p>
         
          <p className="infos">
            <b>Field : </b>
            {employee.field}
          </p>
          <p className="infos">
            <b>Address : </b>
            {employee.address}
          </p>
          <p className="infos">
            <b>Phone : </b>
            {employee.phone}
          </p>
          <p className="infos">
            <b>College : </b>
            {employee.college}
          </p>
          <p className="infos">
            <b>High School : </b>
            {employee.highSchool}
          </p>
          <p className="infos">
            <b>Trainesheep : </b>{employee.traineeship}
            
          </p>
          <p className="infos">
            <b>Experience : </b>
            {employee.experience}
          </p>
          
          </div>
          
         
        </div>
      ) : (
       <EditEmployee/>
      )}
    </div>
  );
};

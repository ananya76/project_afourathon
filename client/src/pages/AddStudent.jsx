import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';


const AddStudent = () => {
    const [student, setStudent] = useState({
        stud_name: "",
        stud_roll: "",
        stud_email: "",
        stud_phone: ""
    });

    const navigate = useNavigate();

    //changing value by targeting the name
    const handleChange = (e)=>{
        setStudent((prev) =>({...prev, [e.target.name]: e.target.value }));
    };

    //calling from backend to add new elctive basicaaly insert query
    const handleClick = async(e) =>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:8800/students",student );
            navigate("/");
            console.log("Successfully Added");
        }catch(err){
            console.log(err);
        }
    }
    console.log(student);
  return (
    <div className="formMain">
        <Header name = "Students" link = "/Students"></Header>
    <div className="formbody">
    <div className='form'>
        <h1>Add Student</h1>
        <input type = "text" placeholder = "Student Name" onChange={handleChange} name = "stud_name"/>
        <input type = "text" placeholder = "Student RollNo." onChange={handleChange} name = "stud_roll"/>
        <input type = "text" placeholder = "Student Email" onChange={handleChange} name = "stud_email"/>
        <input type = "text" placeholder = "Student Phone" onChange={handleChange} name = "stud_phone"/>

        <button onClick={handleClick}>Add</button>
    </div>
    </div>
    </div>
  )
}

export default AddStudent
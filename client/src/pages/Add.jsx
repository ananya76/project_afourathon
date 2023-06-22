import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
const Add = () => {
    const [elective, setElective] = useState({
        s_name: "",
        s_desc: "",
        s_code: ""
    });

    const navigate = useNavigate();

    //changing value by targeting the name
    const handleChange = (e)=>{
        setElective((prev) =>({...prev, [e.target.name]: e.target.value }));
    };

    //calling from backend to add new elctive basicaaly insert query
    const handleClick = async(e) =>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:8800/electives",elective );
            navigate("/");
            console.log("Successfully Added");
        }catch(err){
            console.log(err);
        }
    }
    console.log(elective);
  return (
    <div className="formMain">

        <Header name = "Electives" link = "/Electives"></Header>

    <div className='form'>
        <h1>Add Electives</h1>
        <input type = "text" placeholder = "Elective Name" onChange={handleChange} name = "s_name"/>
        <input type = "text" placeholder = "Elective Description" onChange={handleChange} name = "s_desc"/>
        <input type = "text" placeholder = "Elective Code" onChange={handleChange} name = "s_code"/>

        <button onClick={handleClick}>Add</button>
    </div>
    </div>
  )
}

export default Add
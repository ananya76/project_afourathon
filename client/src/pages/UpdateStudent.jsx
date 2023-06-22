import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate} from 'react-router-dom';
import Header from './components/Header';
const UpdateStudent = () => {
   
    const [student, setStudent] = useState({
        stud_name: "",
        stud_roll: "",
        stud_email: "",
        stud_phone: ""
    });

    const navigate = useNavigate();
    const location = useLocation();
    const studentId =  location.pathname.split("/")[2];


    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get("http://localhost:8800/students/" + studentId);
            const data = res.data[0];
            setStudent({
              ...data
            });
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);


    //changing value by targeting the name
    const handleChange = (e)=>{
        setStudent((prev) =>
        ({
            ...prev, 
            [e.target.name]: e.target.value 
        }));
    };

    //calling from backend to add new elctive basicaaly insert query
    const handleClick = async(e) =>{
        e.preventDefault();
        try{
            await axios.put("http://localhost:8800/students/"+studentId, student);
            navigate("/");
            
        }catch(err){
            console.log(err);
        }
    }
    console.log(student);

    
  return (
    < div className="formMain">
      <Header name = "Students" link = "/Students" />
    <div className='form'>
        <h1>Update Student Electives</h1>
        <input type = "text" placeholder = "Student Name" onChange={handleChange} name = "stud_name" value = {student.stud_name}/>
        <input type = "text" placeholder = "Student RollNo." onChange={handleChange} name = "stud_roll" value={student.stud_roll} />
        <input type = "text" placeholder = "Student Email" onChange={handleChange} name = "stud_email" value = {student.stud_email}/>
        <input type = "text" placeholder = "Student Phone" onChange={handleChange} name = "stud_phone" value = {student.stud_phone}/>

        <button onClick={handleClick}>Update</button>
    </div>
    </div>
  )
}

export default UpdateStudent
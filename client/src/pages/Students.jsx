import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Header from './components/Header';
const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(()=>{
        const fetchAllStudents = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/students");
                console.log(res);
                setStudents(res.data);
            }catch(err){
                console.log(err.messsage);
            }
        }

        fetchAllStudents();
    },[]);

    const handleDelete = async(id,stud_name) =>{
        try{
            await axios.delete("http://localhost:8800/students/"+id);
            window.location.reload();
            window.alert(`deleted sucessfully`);
            
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div>
    <div className="head">
        <Header name = "Home" link = "/"></Header>
    </div>
    <div className='Students--main'>
        <h1>Students</h1>
        <div className='students'>
        <div className="wrapper">
            {students.map((student) =>(
                <div className='student' key ={student.id}>
                    <h2>{student.stud_name}</h2>
                    <h3>{student.stud_roll}</h3>
                    <h3>{student.stud_email}</h3>
                    <h3>+91 {student.stud_phone}</h3>
                    <div className="btn">
                    <button className='delete' onClick={() => handleDelete(student.id)}>Delete</button>
                    <button className='update'><Link to = {`/updateStudent/${student.id}`}>Update</Link></button>
                    <button className='editElective'><Link to = {`/electivesList/${student.id}`} >Edit Elective</Link></button>
                    </div>
                </div>
            ))}
        </div>
        </div>
        <button className='addstud'><Link to = "/addStudent">Add Student</Link></button>
    </div>

    </div>
  )
}

export default Students
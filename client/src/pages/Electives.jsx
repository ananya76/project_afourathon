import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Header from './components/Header';

const Electives = () => {
    const [electives, setElectives] = useState([]);

    useEffect(()=>{
        const fetchAllElectives = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/electives");
                console.log(res);
                setElectives(res.data);
            }catch(err){
                console.log(err.messsage);
            }
        }

        fetchAllElectives();
    },[]);

    const handleDelete = async(id,s_name) =>{
        try{
            await axios.delete("http://localhost:8800/electives/"+id);
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
    <div className='Electives--main'>
        <h1>Electives</h1>
        <div className='electives'>
        <div className="wrapper">
            {electives.map((elective) =>(
                <div className='elective' key ={elective.id}>
                    <h2>{elective.s_name}</h2>
                    <h2>{elective.s_code}</h2>
                    <p>{elective.s_desc}</p>
                    <div className="btn">
                    <button className='delete' onClick={() => handleDelete(elective.id)}>Delete</button>
                    <button className='update'><Link to = {`/update/${elective.id}`}>Update</Link></button>
                    <button className='editElective'><Link to = {`/studentsList/${elective.id}`} >Edit Student</Link></button>
                    </div>
                </div>
            ))}
        </div>
        </div>
        <button className='addElec'><Link to = "/add">Add Elective</Link></button>
    </div>

    </div>
  )
}

export default Electives
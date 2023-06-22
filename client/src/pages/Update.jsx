import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate} from 'react-router-dom';
import Header from './components/Header';
const Update = () => {
   
    const [elective, setElective] = useState({
        s_name: "",
        s_desc: "",
        s_code: ""
    });

    const navigate = useNavigate();
    const location = useLocation();
    const electiveId =  location.pathname.split("/")[2];


    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get("http://localhost:8800/electives/" + electiveId);
            const data = res.data[0];
            setElective({
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
        setElective((prev) =>
        ({
            ...prev, 
            [e.target.name]: e.target.value 
        }));
    };

    //calling from backend to add new elctive basicaaly insert query
    const handleClick = async(e) =>{
        e.preventDefault();
        try{
            await axios.put("http://localhost:8800/electives/"+electiveId, elective);
            navigate("/");
            
        }catch(err){
            console.log(err);
        }
    }
    console.log(elective);

    
  return (
    <div className="formMain">
      <Header name = "Electives" link = "/Electives"></Header>
    <div className='form'>
        <h1>Update Electives</h1>
        <input type = "text" placeholder = "Elective Name" onChange={handleChange} name = "s_name" value = {elective.s_name}/>
        <input type = "text" placeholder = "Elective Description" onChange={handleChange} name = "s_desc" value={elective.s_desc} />
        <input type = "text" placeholder = "Elective Code" onChange={handleChange} name = "s_code" value = {elective.s_code}/>

        <button onClick={handleClick}>Update</button>
    </div>
    </div>
  )
}

export default Update
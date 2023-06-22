import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';

const ElectivesList = () => {
  const [electives, setElectives] = useState([]);
  const [selectedElectives, setSelectedElectives]  = useState([]);
  const [sName, setSName]  = useState([]);

  const location = useLocation();
  const studentId =  location.pathname.split("/")[2];


  // Fetch electives from the server
  useEffect(() => {
    const fetchElectives = async () => {
      try {
        const response = await axios.get('http://localhost:8800/electives');
        setElectives(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchElectives();
  }, []);

  console.log(studentId)

  //fetch Student Name whose elective is to be shown
  useEffect(() => {
    const fetchStud = async () => {
      try {
        const response = await axios.get('http://localhost:8800/students/'+ studentId);
        setSName(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchStud();
  }, []);

    // Fetch selected electives from the server(selctiions table)
    useEffect(() => {
        const fetchSelectedElectives = async () => {
          try {
            const response = await axios.get(`http://localhost:8800/student/${studentId}/electives`);
            console.log(response.data)
            setSelectedElectives(response.data);
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchSelectedElectives();
      }, [studentId]);

      // Filter electives that are not selected
    const availableElectives = electives.filter((elective) => {
    return !selectedElectives.some((selectedElective) => selectedElective.id === elective.id);
  });

    
  // Handle adding an elective to selections
  const handleAddToSelections = async (electiveId) => {
    try {
      await axios.post('http://localhost:8800/selections', {
        student_id: studentId, 
        elective_id: electiveId
      });
      console.log('Elective added to selections');
      console.log(studentId,electiveId)
      

      const updatedResponse = await axios.get(`http://localhost:8800/student/${studentId}/electives`);
      setSelectedElectives(updatedResponse.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleDelete = async(electiveId) =>{
    try{
        await axios.delete("http://localhost:8800/selections",{
          data: {
            student_id: studentId,
            elective_id: electiveId,
          },
        });
        console.log('Elective removed from selections');
      // Refresh the selected electives list
      const response = await axios.get(
        `http://localhost:8800/student/${studentId}/electives`
      );
      setSelectedElectives(response.data);
    }catch(err){
        console.log(err);
    }
}


  return (
    <div>
      <Header name = "Students" link = "/Students"></Header>
    <div className='heading'>
    {sName.map((sn)=>(<h1>{sn.stud_name}</h1>))}
        <h2>Selected Electives</h2>
        <div className="selectedElectives">
          <div className="wrapper">
        {selectedElectives.map((selectedElective)=>(
            <div className='se-list' key={selectedElective.id}>
                <h3>{selectedElective.s_name}</h3>
                <p>{selectedElective.s_desc}</p>
                <p>{selectedElective.s_code}</p>
                <button className='delete' onClick={()=> handleDelete(selectedElective.id)}>Remove Elective</button>
            </div>
        ))}
        </div>
      </div>
    </div>

            <div><h1>----------------------</h1></div>

    <div>
      <h2>Electives List</h2>
      <div className="electivesList">
      <div className="wrapper">
      {availableElectives.map((elective) => (
        <div className='elective-list' key={elective.id}>
          <h3>{elective.s_name}</h3>
          <p>{elective.s_desc}</p>
          <p>{elective.s_code}</p>
          <button onClick={() => handleAddToSelections(elective.id)}>
            Add to Selections
          </button>
        </div>
      ))}
      </div>
      </div>
    </div>
    </div>
  );
};

export default ElectivesList;

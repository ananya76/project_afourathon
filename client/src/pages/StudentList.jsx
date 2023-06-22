import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents]  = useState([]);
  const [eName, setEName]  = useState([]);

  const location = useLocation();
  const electiveId =  location.pathname.split("/")[2];


  // Fetch electives from the server
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8800/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchStudents();
  }, []);

  console.log(electiveId)

  useEffect(() => {
    const fetchElective = async () => {
      try {
        const response = await axios.get('http://localhost:8800/electives/'+ electiveId);
        setEName(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchElective();
  }, []);

    // Fetch selected electives from the server(selctiions table)
    useEffect(() => {
        const fetchSelectedStudents = async () => {
          try {
            const response = await axios.get(`http://localhost:8800/elective/${electiveId}/students`);
            console.log(response.data)
            setSelectedStudents(response.data);
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchSelectedStudents();
      }, [electiveId]);

      // Filter electives that are not selected
    const availableStudents = students.filter((student) => {
    return !selectedStudents.some((selectedStudent) => selectedStudent.id === student.id);
  });

    
  // Handle adding an elective to selections
  const handleAddToSelections = async (studentId) => {
    try {
      await axios.post('http://localhost:8800/selections', {
        student_id: studentId, 
        elective_id: electiveId
      });
      console.log('Elective added to selections');
      console.log(studentId,electiveId)
      

      const updatedResponse = await axios.get(`http://localhost:8800/elective/${electiveId}/students`);
      setSelectedStudents(updatedResponse.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleDelete = async(studentId) =>{
    try{
        await axios.delete("http://localhost:8800/selections",{
          data: {
            student_id: studentId,
            elective_id: electiveId,
          },
        });
        console.log('Student removed from selections');
      // Refresh the selected electives list
      const response = await axios.get(
        `http://localhost:8800/elective/${electiveId}/students`
      );
      setSelectedStudents(response.data);
    }catch(err){
        console.log(err);
    }
}


  return (
    <div>
      <Header name = "Electives" link = "/Electives" />
    <div className='heading'>
      {eName.map((en)=>(<h1>{en.s_name}</h1>))}
        <h2>Selected Students</h2>
        <div className="selectedStudents">
          <div className="wrapper">
        {selectedStudents.map((selectedStudent)=>(
            <div className='se-list' key={selectedStudent.id}>
                <h3>{selectedStudent.stud_name}</h3>
                <p>{selectedStudent.stud_roll}</p>
                <p>{selectedStudent.stud_email}</p>
                <p>{selectedStudent.stud_phone}</p>
                <button className='delete' onClick={()=> handleDelete(selectedStudent.id)}>Remove Student</button>
            </div>
        ))}
        </div>
      </div>
    </div>

            <div><h1>----------------------</h1></div>

    <div>
      <h2>Students List</h2>
      <div className="studentsList">
      <div className="wrapper">
      {availableStudents.map((student) => (
        <div className='student-list' key={student.id}>
          <h3>{student.stud_name}</h3>
          <p>{student.stud_roll}</p>
          <p>{student.stud_email}</p>
          <p>{student.stud_phone}</p>
          <button onClick={() => handleAddToSelections(student.id)}>
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

export default StudentList;

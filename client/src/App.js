import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Students from "./pages/Students"
import Electives from './pages/Electives';
import Add from './pages/Add';
import AddStudent from './pages/AddStudent';
import Update from './pages/Update';
import "./style.css";
import UpdateStudent from './pages/UpdateStudent';
import ElectivesList from './pages/ElectivesList';
import StudentList from './pages/StudentList';
import Header from './pages/components/Header';
import Home from './pages/components/Home';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {
          <div>
        <Header/>
        <Home/>
        </div> 
        }/>
        <Route path = "/Students" element = {<Students/>}></Route>
        <Route path = "/Electives" element = {<Electives/>}></Route>
        <Route path = "/add" element = {<Add/>}/>
        <Route path = "/addStudent" element = {<AddStudent/>}/>
        <Route path = "/electivesList/:id" element = {<ElectivesList/>}/>
        <Route path = "/studentsList/:id" element = {<StudentList/>}/>
        <Route path = "/update/:id" element = {<Update/>}/>
        <Route path = "/updateStudent/:id" element = {<UpdateStudent/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();

//connect to mysql local db
const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "Ananya9315#",
    database: "project"
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.json("Hello this is backend for project Afouathon");
});

//Display All electives Query
app.get("/electives", (req,res)=>{
    const q = "SELECT * FROM project.electives"
    db.query(q,(err,data)=>{
        if(err){
            return res.json({message: err.message});
        }else{
            return res.json(data);
        }
    });
})

//Get all students query
app.get("/students", (req,res)=>{
    const q = "SELECT * FROM project.students"
    db.query(q,(err,data)=>{
        if(err){
            return res.json({message: err.message});
        }else{
            return res.json(data);
        }
    });
})

//Display specific electives Query
app.get("/electives/:id", (req,res)=>{
    const electiveId = req.params.id;
    const q = "SELECT * FROM project.electives WHERE id = ?"
    db.query(q,[electiveId],(err,data)=>{
        if(err){
            return res.json({message: err.message});
        }else{
            return res.json(data);
        }
    });
})

//Display specific Student Query
app.get("/students/:id", (req,res)=>{
    const studentId = req.params.id;
    const q = "SELECT * FROM project.students WHERE id = ?"
    db.query(q,[studentId],(err,data)=>{
        if(err){
            return res.json({message: err.message});
        }else{
            return res.json(data);
        }
    });
})

//Insert Query
app.post("/electives", (req,res) =>{
    const q = "INSERT INTO electives (`s_name`,`s_desc`,`s_code`) VALUES (?)"
    // const values = ["Soft Computing", "test2","CSET326"];
    //taking user input
    //take input from what is written in body and snd to backend
    const values = [
        req.body.s_name,
        req.body.s_desc,
        req.body.s_code,
    ];

    db.query(q,[values],(err,data)=>{
        if(err){
            return res.json({message: err.message});
        }else{
            return res.json("Elective has been inserted successfully");
        }
    });
});


//Insert Query for Students
app.post("/students", (req,res) =>{
    const q = "INSERT INTO students (`stud_name`,`stud_roll`,`stud_email`,`stud_phone`) VALUES (?)"
    // const values = ["Soft Computing", "test2","CSET326"];
    //taking user input
    //take input from what is written in body and snd to backend
    const values = [
        req.body.stud_name,
        req.body.stud_roll,
        req.body.stud_email,
        req.body.stud_phone,
    ];

    db.query(q,[values],(err,data)=>{
        if(err){
            return res.json({message: err.message});
        }else{
            return res.json("Student has been inserted successfully");
        }
    });
});

//Deletion
app.delete("/electives/:id", (req,res) =>{
    const electiveId = req.params.id;
    const q = "DELETE FROM electives WHERE id = ?";

    db.query(q,[electiveId],(err,data) => {
        if(err){
            return res.json({message: err.message});    
        }else{
            return res.json("Elective has been deleted successfully");
        }
    });
})

//Deletion of student
app.delete("/students/:id", (req,res) =>{
    const studentId = req.params.id;
    const q = "DELETE FROM students WHERE id = ?";

    db.query(q,[studentId],(err,data) => {
        if(err){
            return res.json({message: err.message});    
        }else{
            return res.json("Student has been deleted successfully");
        }
    });
})


//Update
app.put("/electives/:id", (req,res) =>{
    const electiveId = req.params.id;
    const q = "UPDATE electives SET `s_name` = ?, `s_desc` = ?, `s_code` = ? WHERE id = ?" ; 
    //take input from what is written in body and snd to backend
    const values = [
        req.body.s_name,
        req.body.s_desc,
        req.body.s_code,
    ];

    db.query(q, [...values,electiveId],(err,data) =>{
        if(err){
            return res.json({message: err.message});
        }else{
            return res.json("Elective updated successfully");
        }    
    });
});

//Update Student
app.put("/students/:id", (req,res) =>{
    const studentId = req.params.id;
    const q = "UPDATE students SET `stud_name` = ?, `stud_roll` = ?, `stud_email` = ?, `stud_phone` = ? WHERE id = ?" ; 
    //take input from what is written in body and snd to backend
    const values = [
        req.body.stud_name,
        req.body.stud_roll,
        req.body.stud_email,
        req.body.stud_phone,
    ];

    db.query(q, [...values,studentId],(err,data) =>{
        if(err){
            return res.json({message: err.message});
        }else{
            return res.json("Student updated successfully");
        }    
    });
});



// ---------------------------------3RD Problem Statement-------------------------------------------------
//Show Selections Table
app.get("/selections", (req,res)=>{
    const q = "SELECT * FROM project.selections"
    db.query(q,(err,data)=>{
        if(err){
            return res.json({message: err.message});
        }else{
            return res.json(data);
        }
    });
})



// Adding to Selections
app.post('/selections', (req, res) => {

    const { student_id, elective_id } = req.body;

    const q = "INSERT INTO selections (`student_id`, `elective_id`) VALUES (?, ?) ";
    // const query = "INSERT INTO selections (`student_id`, `elective_id`) VALUES  = (?) ";
    // const values = [
    //     req.body.studentId,
    //     req.body.electiveId
    // ]
    db.query(q, [student_id,elective_id],(err, data) => {
      if (err) {
        return res.json({ message: err.message });
      } else {
        return res.json({ message: 'Selections added successfully' });
      }
    });
  });


//For Fetching Student's Electives
app.get("/student/:studentId/electives",(req,res)=>{
    const {studentId} = req.params
    const q =`SELECT electives.* FROM electives JOIN selections ON electives.id = selections.elective_id WHERE selections.student_id = ?`
    db.query(q,[studentId],(err,data)=>{
        if(err){
            return res.json({message: err.message});
        }else{
            return res.json(data);
        }
    });
})

//For fetching Elective's Student
app.get("/elective/:electiveId/students",(req,res)=>{
    const {electiveId} = req.params
    const q =`SELECT students.* FROM students JOIN selections ON students.id = selections.student_id WHERE selections.elective_id = ?`
    db.query(q,[electiveId],(err,data)=>{
        if(err){
            return res.json({message: err.message});
        }else{
            return res.json(data);
        }
    });
})
 
//Delete Students Elective
app.delete("/selections", (req,res) =>{
    const { student_id, elective_id } = req.body;
    const q = 'DELETE FROM selections WHERE student_id = ? AND elective_id = ?'

    db.query(q,[student_id,elective_id],(err,data) => {
        if(err){
            return res.json({message: err.message});    
        }else{
            return res.json("Student's Elective has been deleted successfully");
        }
    });
})

//Backend on port 8800
app.listen(8800, ()=> {
    console.log("Connection Successfull!");
});
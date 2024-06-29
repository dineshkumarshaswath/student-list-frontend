import { useState } from 'react'

import Students from './components/student'
import Addstudents from './components/addStudent'
import Updatestudents from './components/updateStudent';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'

function App() {
  const [students, setStudents] = useState([])

  return (
    <>
      <Routes>
        <Route path="/" element={<Students students={students}
          setStudents={setStudents} />} />

        <Route path="/add" element={<Addstudents students={students}
          setStudents={setStudents} />} />

        <Route path="/editstudent/:id" element={<Updatestudents students={students}
          setStudents={setStudents} />} />


      </Routes>



    </>
  )
}

export default App

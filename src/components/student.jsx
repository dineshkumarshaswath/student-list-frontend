import React from 'react'
import { Row, Col, Button } from 'react-bootstrap';

import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import Base from './base'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarker, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom'




function Students({ students, setStudents }) {

  const [show, setShow] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function getStudents() {
      const response = await fetch("https://student-list-backend.onrender.com/api/students", {
        method: "GET"
      })

      const data = await response.json();


      if (data.student) {

        setStudents(data.student)
      } else {
        console.log(data.message)
      }
    }


    getStudents()


  }, [])

  //delete function is here

  async function deletestudent(studentid) {

    const response = await fetch(`https://student-list-backend.onrender.com/api/students/delete/${studentid}`, {
      method: "DELETE",
    })
    const data = await response.json()


    if (data.message == 'successfully deleted') {
      const newstudentslist = students.filter((student, idx) => student._id != studentid);
      setStudents(newstudentslist)

      setShow(true)

    } else {
      console.log(data.message)
    }
  }

  return (


    <Base>

      <h1 style={{ textAlign: 'center', fontWeight: 'bolder', margin: '15px', color: 'black' }}>
        STUDENTS LIST</h1>
      <hr />



      <Row style={{ padding: "30px" }}>

        {students.length > 0 ? <Table striped bordered hover variant="secondary" responsive >
          <thead >
            <tr>
              <th  >S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roll No</th>
              <th>Phone No</th>
              <th>DOA</th>
              <th>Edit</th>
              <th>Delete</th>


            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (

              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.rollNo}</td>
                <td>{student.phoneNo}</td>
                <td>{student.date}</td>

                <td> <Button variant="primary" style={{ marginRight: "25px", marginLeft: "10px" }}
                  onClick={() => navigate(`/editstudent/${student._id}`)}><FontAwesomeIcon icon={faMarker} />

                </Button></td>
                <td><Button variant="danger" onClick={() => deletestudent(student._id)}>
                  <FontAwesomeIcon icon={faTrashCan} /></Button></td>

              </tr>))}
          </tbody>
        </Table> : <div style={{ textAlign: 'center' }}><Spinner animation="border" /></div>}

      </Row>

    </Base>



  )


}

export default Students;




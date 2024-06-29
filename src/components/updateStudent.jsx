import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Button, Form } from "react-bootstrap"
import Base from './base'
import { fieldSchema } from './addStudent'
import { useFormik } from 'formik'


function Updatestudents({ students, setStudents }) {

    const navigate = useNavigate()
    const { id } = useParams()
    const a = students.find((data, idx) => data._id == id)

    //formik validation

    const { handleSubmit, handleChange, values, handleBlur, touched, errors } = useFormik({
        initialValues: {
            name: a.name,
            email: a.email,
            rollNo: a.rollNo,
            phoneNo: a.phoneNo,
            date: a.date
        },
        validationSchema: fieldSchema,
        onSubmit: (newupdate) => {

            handleupdate(newupdate)
        }

    })






    //handlesubmit  function is here

    async function handleupdate(newupdate) {
        console.log(students)

        const response = await fetch(`https://student-list-backend.onrender.com/api/students/edit/${a._id}`,
            {
                method: "PUT",
                body: JSON.stringify(newupdate),
                headers: {
                    "content-type": "application/json"
                },


            })
        const data = await response.json()
        console.log(data)
        if (data.message == "successfully edited the data") {


            students[a._id] = newupdate;



            setStudents(students)
            navigate("/")


        } else {
            console.log(data.message)
        }



    }



    return (

        <Base>






            <div style={{ margin: "20px", textAlign: 'center' }}>

                <h3 style={{ textAlign: 'center', margin: "20px", fontWeight: 'bolder', color: 'black' }}>
                    Update students data</h3>
                <hr />



                <Row xs={1} sm={1} md={1} lg={1}>
                    <form onSubmit={handleSubmit} style={{ display: "grid", placeItems: "center" }} >

                        <Col><Form.Control style={{ width: "100%", margin: "10px" }}
                            value={values.name}
                            name='name'
                            type="text"
                            placeholder="Enter student name"
                            onBlur={handleBlur}
                            onChange={handleChange} />
                        </Col>
                        <Col style={{ color: 'crimson' }}>{touched.name ? errors.name : ""}</Col>
                        <Col><Form.Control style={{ width: "100%", margin: "10px" }} type="email"
                            value={values.email}
                            name='email'
                            placeholder="Enter email"
                            onBlur={handleBlur}
                            onChange={handleChange} /></Col>
                        <Col style={{ color: 'crimson' }}>{touched.email ? errors.email : ""}</Col>

                        <Col><Form.Control style={{ width: "100%", margin: "10px" }} type="text"
                            value={values.rollNo}
                            name='rollNo'
                            placeholder='Enter RollNumber'
                            onBlur={handleBlur}
                            onChange={handleChange} /></Col>

                        <Col style={{ color: 'crimson' }}>{touched.rollNo ? errors.rollNo : ""}</Col>

                        <Col><Form.Control style={{ width: "100%", margin: "10px" }} type="text"
                            value={values.phoneNo}
                            name='phoneNo'
                            placeholder='Enter phoneNumber'
                            onBlur={handleBlur}
                            onChange={handleChange} /></Col>

                        <Col style={{ color: 'crimson' }}>{touched.phoneNo ? errors.phoneNo : ""}</Col>

                        <Col><Form.Control style={{ width: "100%", margin: "10px" }} type="date"
                            value={values.date}
                            name='date'
                            placeholder='Enter date'
                            onBlur={handleBlur}
                            onChange={handleChange} /></Col>

                        <Col style={{ color: 'crimson' }}>{touched.date ? errors.date : ""}</Col>

                        <Col>
                            <Button variant='success'
                                type='submit'>update student</Button></Col>
                    </form>
                </Row>

            </div>

        </Base>









    )
}

export default Updatestudents
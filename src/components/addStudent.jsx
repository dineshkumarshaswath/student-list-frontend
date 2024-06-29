import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Row, Col, Form } from 'react-bootstrap';
import Base from './base'
import * as yup from 'yup'
import { useFormik } from 'formik';

//initialization for the yup object 

export const fieldSchema = yup.object({
    name: yup.string().required("* required").min(3, "minimum 5 characters required"),
    email: yup.string().required("* required").min(10, "minimum 10 characters required"),
    rollNo: yup.string().required("* required").min(12, "minimum 12 characters required"),
    phoneNo: yup.string().required("* required").min(10, "minimum 10 characters required"),
    date: yup.string().required("* required"),
})

function Addstudents({ students, setStudents }) {
    const navigate = useNavigate()



    //This is Formik validation function

    const { handleSubmit, handleChange, values, handleBlur, touched, errors } = useFormik({
        initialValues: {
            name: "",
            email: "",
            rollNo: "",
            phoneNo: "",
            date: "",
        },
        validationSchema: fieldSchema,
        onSubmit: (newstudent) => {

            handleclick(newstudent)
        }

    })

    //handle submit funcion is here

    async function handleclick(newstudent) {

        const response = await fetch("https://student-list-backend.onrender.com/api/students/post", {
            method: "POST",
            body: JSON.stringify(newstudent),
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json()


        if (data.newstudent) {
            setStudents([...students, data.newstudent])
            alert('added successfully')

            navigate("/")
        } else {
            console.log(data.message)
        }



    }




    return (


        <Base>


            <div style={{ margin: "30px", textAlign: 'center' }}>
                <h2 style={{ margin: "30px", fontWeight: 'bolder', color: 'black' }}>Addstudents here</h2>
                <hr />
                <Row xs={1} sm={1} md={1} lg={1}>
                    <form onSubmit={handleSubmit} style={{ display: "grid", placeItems: "center" }}>


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
                                type='submit'>add student</Button></Col>


                    </form>
                </Row>
            </div>


        </Base>




    )

}

export default Addstudents
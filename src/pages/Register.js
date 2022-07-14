import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { useHistory ,Prompt} from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const [registerUser, setRegisterUser] = useState([])
  const [modifiedField, setModifiedField] = useState(false)
  let history = useHistory()
  let initialData = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    location: "",
    phoneNumber: "",
    id: ""
  }
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Field should contain a valid e-mail").max(255).required("E-mail is required"),
    password: Yup.string().required("password is required"),
    firstname: Yup.string().required("firstname is required"),
    lastname: Yup.string().required("lastname is required"),
    location: Yup.string(),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10, "to short")
      .max(10, "to long"),
  })

  const fetchUser = async () => {
    let { data } = await axios.get(`http://localhost:3001/users`)
    setRegisterUser(data)
  }
  useEffect(() => {
    fetchUser()
  }, [])

  const timeout = () => {
    return new Promise(res => setTimeout(res, 1000));
  }

  const handleSubmit = async (values) => {
    let existingUser = registerUser.find((user) => {
      if (user.email === values.email && user.password === values.password) {
        return user
      }
    })
    if (existingUser) {
      toast.error("User already exists")
    } else {
      let res = await axios.post(`http://localhost:3001/users`, values)
      if (res.status === 201) {
        await timeout(2000);
        history.push("/login")
      }
    }
  }


  return (
    <>
      <ToastContainer autoClose={1000} />
      <Container>
        <div><h2>Register User</h2></div>
        <br />
        <Formik
          initialValues={initialData}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values)
            setSubmitting(false)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            isSubmitting,
            getFieldProps
          }) => (
            <form onSubmit={handleSubmit} autoComplete="off">
              <Row>
                <Col sm={12} md={2}>Email</Col>
                <Col>
                  <input
                    name="email"
                    placeholder="Enter Email ID"
                    {...getFieldProps("email")}
                    onClick={() => { values.email && setModifiedField(true) }}
                  />
                  <span className='form-error-msg'>{errors.email && touched.email && errors.email}</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={12} md={2}>Password</Col>
                <Col>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    {...getFieldProps("password")}
                    onClick={() => { values.password && setModifiedField(true) }}
                  />
                  <span className='form-error-msg'>{errors.password && touched.password && errors.password}</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={12} md={2}>First Name</Col>
                <Col>
                  <input
                    name="firstname"
                    {...getFieldProps("firstname")}
                    onClick={() => { values.firstname && setModifiedField(true) }}
                  />
                  <span className='form-error-msg'>{errors.firstname && touched.firstname && errors.firstname}</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={12} md={2}>Last Name</Col>
                <Col>
                  <input
                    name="lastname"
                    {...getFieldProps("lastname")}
                    onClick={() => { values.lastname && setModifiedField(true) }}
                  />
                  <span className='form-error-msg'>{errors.lastname && touched.lastname && errors.lastname}</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={12} md={2}>Location</Col>
                <Col>
                  <input
                    name="location"
                    {...getFieldProps("location")}
                    onClick={() => { values.location && setModifiedField(true) }}
                  />
                  <span className='form-error-msg'>{errors.location && touched.location && errors.location}</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={12} md={2}>Mobile phoneNumber</Col>
                <Col>
                  <input
                    type="phoneNumber"
                    name="phoneNumber"
                    {...getFieldProps("phoneNumber")}
                    onClick={() => { values.phoneNumber && setModifiedField(true) }}
                  />
                  <span className='form-error-msg'>{errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={12} md={2}></Col>
                <Col>
                  <Button
                    type='submit'
                    disabled={isSubmitting}>Register
                  </Button>
                </Col>
              </Row>
            </form>
          )}
        </Formik>
      </Container>
      <Prompt when={modifiedField} message={`Are you sure want to exit without Registering?!!`} />
    </>
  )
}

export default Register
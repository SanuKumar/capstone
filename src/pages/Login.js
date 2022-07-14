import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Formik, validateYupSchema } from 'formik'
import * as Yup from "yup"

const Login = ({ updateLocalStorage }) => {
  let history = useHistory()
  const [usersData, setUsersData] = useState([])
  const [formData, setFormData] = useState({ email: "", password: "" })

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Field should contain a valid e-mail").max(255).required("E-mail is required"),
    password: Yup.string().required("password is required")
  })

  const fetchUser = async () => {
    let { data } = await axios.get(`http://localhost:3001/users`)
    setUsersData(data)
  }
  useEffect(() => {
    fetchUser()
  }, [])

  const handleSubmit = async (values) => {
    console.log("values", values)
    let res = usersData.find((user) => {
      if (user.email === values.email && user.password === values.password) {
        return user
      }
    })
    if (res) {
      alert("User Successfully Logged In")
      localStorage.setItem('isUserLoggedIn', JSON.stringify(res))
      updateLocalStorage(JSON.stringify(res))
      history.push('/')
      window.location.reload();
    } else {
      toast.error("Enter credential is incorrect", {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  return (
    <div>
      <ToastContainer autoClose={1000} />
      <Container>
        <div><h2>Login</h2></div>
        <br />
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values)
            setSubmitting(false)
          }}
        >
          {({
            errors,
            touched,
            handleSubmit,
            isSubmitting,
            getFieldProps
          }) => (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col sm={12} md={2}>Email</Col>
                <Col>
                  <input
                    name="email"
                    placeholder="Enter Email ID"
                    {...getFieldProps("email")}
                  />
                  <p className='form-error-msg'>{errors.email && touched.email && errors.email}</p>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={12} md={2}>Password</Col>
                <Col>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    {...getFieldProps("password")}
                  />
                  <p className='form-error-msg'>{errors.password && touched.password && errors.password}</p>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={12} md={2}></Col>
                <Col>
                  <Button
                    type='submit'
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </Col>
              </Row>
            </form>
          )}
        </Formik>

      </Container>
    </div >
  )
}

export default Login
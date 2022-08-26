import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useHistory, Prompt } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Formik, useFormikContext, Form } from 'formik'
import * as Yup from "yup"

const Login = () => {
  let history = useHistory()
  const [usersData, setUsersData] = useState([])
  const initialValues = {
    email: "", password: ""
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Field should contain a valid e-mail").max(255).required("E-mail is required"),
    password: Yup.string().required("password is required")
  })

  const fetchUser = async () => {
    let { data } = await axios.get(`https://products-json-server.herokuapp.com/users`)
    setUsersData(data)
  }
  useEffect(() => {
    fetchUser()
  }, [])

  const timeout = (time) => {
    return new Promise(res => setTimeout(res, time));
  }


  const handleSubmit = async (values) => {
    let res = usersData.find((user) => {
      if (user.email === values.email && user.password === values.password) {
        return user
      }
    })
    if (res) {
      toast.success("User successfully logged-in", {
        position: toast.POSITION.TOP_CENTER
      });
      await timeout(2000);
      sessionStorage.setItem('isUserLoggedIn', JSON.stringify(res))
      history.push('/')
      window.location.reload();
    } else {
      toast.error("User is not registered", {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  const PromptIfDirty = () => {
    const formik = useFormikContext();
    return (
      <Prompt
        when={formik.dirty}
        message="Are you sure you want to leave? You have with unsaved changes."
      />
    );
  };

  return (
    <div>
      <ToastContainer autoClose={1000} />
      <Container>
        <Row>
          <Col lg={6} className="d-none d-lg-block">
            <img  src="https://media.istockphoto.com/vectors/login-blue-3d-button-in-flat-style-isolated-on-white-background-vector-id1299656570?b=1&k=20&m=1299656570&s=170667a&w=0&h=m-c2qsCgqdKTxovnkfvX3k0PSBNpiR_if6PgygVkm3Q=" alt="login-img" />
          </Col>
          <Col lg={6} md={12} sm={12} xs={12}>
            <div><h2>Login</h2></div>
            <hr />
            <br />
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
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
                <Form onSubmit={handleSubmit} autoComplete="off">
                  <PromptIfDirty />
                  <Row>
                    <Col sm={12} md={2}>Email</Col>
                    <Col>
                      <input
                        name="email"
                        placeholder="Enter Email ID"
                        {...getFieldProps("email")}
                        autoComplete="new-password"
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
                        autoComplete="new-password"
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
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
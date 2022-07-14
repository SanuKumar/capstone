import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useHistory, Prompt } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Formik, useFormikContext, Form } from 'formik'
import * as Yup from "yup"

const Login = ({ updateLocalStorage }) => {
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
    let { data } = await axios.get(`http://localhost:3001/users`)
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

  const PromptIfDirty = () => {
    const formik = useFormikContext();
    return (
      <Prompt
        when={formik.dirty && formik.submitCount === 0}
        message="Are you sure you want to leave? You have with unsaved changes."
      />
    );
  };

  return (
    <div>
      <ToastContainer autoClose={1000} />
      <Container>
        <div><h2>Login</h2></div>
        <hr />
        <br />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit(values)
            setSubmitting(false)
            resetForm()
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
      </Container>
    </div>
  )
}

export default Login
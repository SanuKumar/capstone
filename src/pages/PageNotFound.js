import React from 'react'
import { Image, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const PageNotFound = () => {
  let history = useHistory()
  return (
    <>
      <h1>Page Not Found</h1>
      <div style={{ float: "right", margin: "-5rem 1rem" }}>
        <Button onClick={() => history.push("/")}>Go Back Home</Button>
      </div>
      <div>
        <Image src="https://media.istockphoto.com/vectors/concept-404-error-page-flat-cartoon-style-vector-illustration-vector-id1149316411?k=20&m=1149316411&s=612x612&w=0&h=wzSCBQVVh76LWzeEQP01DDEhpm983Y6_tsqlZ46goZ0=" alt="page not found" />
      </div>
    </>
  )
}

export default PageNotFound
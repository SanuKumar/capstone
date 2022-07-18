import React from "react"
import { render, screen, cleanup } from "@testing-library/react"
import Register from "../Register"
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';

afterEach(cleanup)

const history = createMemoryHistory();

test('Check if Register component Exists', () => {
  render(
    <Router history={history}>
      <Register />
    </Router>
  );

  expect(screen.getByRole('heading', {  name: /Register User/i})).toBeInTheDocument()
})

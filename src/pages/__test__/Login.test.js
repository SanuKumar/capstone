import React from "react"
import { render, screen, cleanup } from "@testing-library/react"
import Login from "../Login"
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';

afterEach(cleanup)

const history = createMemoryHistory();

test('Check if Login component Exists', () => {
  render(
    <Router history={history}>
      <Login />
    </Router>
  );

  expect(screen.getByRole('heading', {  name: /login/i})).toBeInTheDocument()
})

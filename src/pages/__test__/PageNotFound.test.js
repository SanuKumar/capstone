import React from "react"
import { render, screen, cleanup } from "@testing-library/react"
import PageNotFound from "../PageNotFound"
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';

afterEach(cleanup)

const history = createMemoryHistory();

test('Check if Page Not Found component Exists', () => {
  render(
    <Router history={history}>
      <PageNotFound />
    </Router>
  );

  expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument()
})

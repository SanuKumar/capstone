import React from "react"
import { render, screen, cleanup } from "@testing-library/react"
import AddProduct from "../AddProduct"
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';

afterEach(cleanup)

const history = createMemoryHistory();

test('Check if Add Product component exists', () => {
  render(
    <Router history={history}>
      <AddProduct />
    </Router>
  );

  expect(screen.getByText(/Add New Product/i)).toBeInTheDocument()
})

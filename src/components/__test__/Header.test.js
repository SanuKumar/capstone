import React from "react"
import { render, cleanup, screen } from "@testing-library/react"
import Header from "../Header"

afterEach(cleanup)

describe("Header page snapshot", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  })
})


test('Check if Header text exists', () => {
  render(<Header />)
  expect(screen.getByText(/Product Inventory/i)).toBeInTheDocument()
})

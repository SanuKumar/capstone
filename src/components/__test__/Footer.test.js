import React from "react"
import { render,screen, cleanup } from "@testing-library/react"
import Footer from "../Footer"

afterEach(cleanup)

describe("Footer page snapshot", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  })
})

test('Check if footer text exists', () => {
  render(<Footer />)
  expect(screen.getByText(/Sanu ©. All rights reserved./i)).toBeInTheDocument()
})

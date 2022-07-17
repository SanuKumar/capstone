import React from "react"
import { render, cleanup } from "@testing-library/react"
import Header from "../Header"

afterEach(cleanup)

describe("Header page snapshot", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  })
})
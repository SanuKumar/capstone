import React from "react"
import { render, cleanup } from "@testing-library/react"
import Footer from "../Footer"

afterEach(cleanup)

describe("Footer page snapshot", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  })
})
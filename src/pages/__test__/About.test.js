import React from "react"
import { render, cleanup } from "@testing-library/react"
import About from "../About"

afterEach(cleanup)

describe("About page snapshot", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<About />);
    expect(asFragment()).toMatchSnapshot();
  })
})
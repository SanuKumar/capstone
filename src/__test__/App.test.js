import React from "react"
import { render, cleanup } from "@testing-library/react"
import App from "../App"

afterEach(cleanup)

describe("App page snapshot", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  })
})
import ProductList from '../ProductList';
import { cleanup, screen, render } from "@testing-library/react"

afterEach(cleanup)

test('renders ProductList correctly when there are empy products array', () => {
  const products = []
  const { asFragment } = render(<ProductList products={products} />)
  expect(asFragment()).toMatchSnapshot();
});

test("Product Field Header", () => {
  render(<ProductList />)
  const header = screen.getByTestId('product-field-header')
  expect(header.textContent).toBe('Customise Product Fields')
})

describe("When products array props passed to ProductList component is null", () => {
  render(<ProductList products={null} />)

  test("should not crash and no Product Component is rendered", () => {
    render(<ProductList />)
  })
})


test("Check if Add button is rendered", () => {
  render(<ProductList />)
  expect(screen.getByRole('button', { name: /add product/i })).toHaveTextContent('Add Product')
})

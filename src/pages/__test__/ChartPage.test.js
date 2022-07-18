import ChartPage from '../ChartPage';
import { cleanup, render } from "@testing-library/react"

afterEach(cleanup)

test('renders Chart correctly when there are products', () => {
  const products = [{
    "id": 2,
    "name": "iPhone X",
    "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    "price": 899,
    "rating": 2,
    "quantity": 34,
    "manufacture": "Apple",
    "category": "smartphones",
    "thumbnail": "https://dummyjson.com/image/i/products/2/thumbnail.jpg",
    "images": [
      "https://dummyjson.com/image/i/products/2/1.jpg",
      "https://dummyjson.com/image/i/products/2/2.jpg",
      "https://dummyjson.com/image/i/products/2/3.jpg",
      "https://dummyjson.com/image/i/products/2/thumbnail.jpg"
    ]
  },
  {
    "id": 3,
    "name": "Samsung Universe 9",
    "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
    "price": 1249,
    "rating": 3,
    "quantity": 36,
    "manufacture": "Samsung",
    "category": "smartphones",
    "thumbnail": "https://dummyjson.com/image/i/products/3/thumbnail.jpg",
    "images": [
      "https://dummyjson.com/image/i/products/3/1.jpg"
    ]
  }]
  const { asFragment } = render(<ChartPage products={products} />)
  expect(asFragment()).toMatchSnapshot();
});


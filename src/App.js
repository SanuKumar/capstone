import React, { useEffect, useState } from "react"
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:3001/products`)
      setProducts(data)
    }
    fetchData();

  }, [])


  return (
    <div>
      <Header />
      <ProductList products={products} />
      <Footer />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react"
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import axios from "axios";
import Product from "./pages/Product"
import {
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    console.log("hi")
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:3001/products`)
      setProducts(data)
      setSearchResult(data)
    }
    fetchData();
  }, [])

  const handleProductSearch = (searchKey) => {
    if (searchKey) {
      let filterProduct = searchResult.filter((product) => product.title.toLowerCase().includes(searchKey.toLowerCase()));
      setProducts(filterProduct)
    } else {
      setProducts(searchResult)
    }
  }

  return (
    <>
      <Header handleProductSearch={handleProductSearch} />
      <Switch>
        <Route exact path="/" ><ProductList products={products} /></Route>
        <Route exact path="/product/:id"  ><Product /></Route>
        <Route exact path="/product-edit/:id"  ><Product /></Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;

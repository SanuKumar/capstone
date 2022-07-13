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
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
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
      <div style={{ margin: "10rem 0 5rem 0" }}>
        <Switch>
          <Route exact path="/" ><ProductList products={products} /></Route>
          <Route exact path="/product/:id"><Product /></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/register"><Register /></Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;

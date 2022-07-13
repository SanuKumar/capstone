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
import About from "./pages/About";
import ChartPage from "./pages/ChartPage";

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchResult, setSearchResult] = useState([])
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:3002/products`)
      setLoading(false)
      setProducts(data)
      setSearchResult(data)
    }
    fetchData();
  }, [])

  const updateLocalStorage = (key) => {
    setIsUserLoggedIn(key)
  }

  useEffect(() => {
    setIsUserLoggedIn(JSON.parse(localStorage.getItem(isUserLoggedIn)))
  }, [isUserLoggedIn])

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
      <Header handleProductSearch={handleProductSearch} isUserLoggedIn={isUserLoggedIn} />
      <div style={{ margin: "10rem 0 5rem 0" }}>
        <Switch>
          <Route exact path="/" ><ProductList products={products} loading={loading} /></Route>
          <Route exact path="/product/:id"><Product /></Route>
          <Route exact path="/login"><Login updateLocalStorage={updateLocalStorage} /></Route>
          <Route exact path="/register"><Register /></Route>
          <Route exact path="/about"><About /></Route>
          <Route exact path="/chart"><ChartPage products={products} /></Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;

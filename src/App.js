import React, { useEffect, useState } from "react"
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
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
import AddProduct from "./pages/AddProduct";
import PageNotFound from "./pages/PageNotFound.js"
import { Suspense, lazy } from 'react';
import Loader from "./components/Loader";

const ProductList = lazy(() => import('./components/ProductList'));

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchResult, setSearchResult] = useState([])
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProduct();
  }, [])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`http://localhost:3002/products`)
      setLoading(false)
      let reversedData = res.data.reverse()
      setProducts(reversedData)
      setSearchResult(reversedData)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    setIsUserLoggedIn(JSON.parse(localStorage.getItem('isUserLoggedIn')))
  }, [])

  const fetchProductCallBack = () => {
    fetchProduct()
  }

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
      <Suspense fallback={<Loader />}>
        <div style={{ padding: "10rem 0 5rem 0" }}>
          <Switch>
            <Route exact path="/" ><ProductList products={products} loading={loading} isUserLoggedIn={isUserLoggedIn} fetchProductCallBack={fetchProductCallBack} /></Route>
            <Route exact path="/product/:id"><Product isUserLoggedIn={isUserLoggedIn} fetchProductCallBack={fetchProductCallBack} /></Route>
            <Route exact path="/login"><Login /></Route>
            <Route exact path="/register"><Register /></Route>
            <Route exact path="/about"><About /></Route>
            <Route exact path="/chart"><ChartPage products={products} /></Route>
            <Route exact path="/addproduct"><AddProduct fetchProductCallBack={fetchProductCallBack} /></Route>
            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;

import React, { useEffect, useState, Suspense, lazy } from "react"
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import Product from "./pages/Product"
import {
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";
import ChartPage from "./pages/ChartPage";
import Loader from "./components/Loader";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductList = lazy(() => import('./components/ProductList'));
const PageNotFound = lazy(() => import("./pages/PageNotFound.js"));
const AddProduct = lazy(() => import("./pages/AddProduct"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))
const About = lazy(() => import("./pages/About"))

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
      const res = await axios.get(`https://products-json-server.herokuapp.com/products`)
      setLoading(false)
      let reversedData = res.data.reverse()
      setProducts(reversedData)
      setSearchResult(reversedData)
    } catch (error) {
      setLoading(false)
      toast.error("Error while fetching products", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  useEffect(() => {
    setIsUserLoggedIn(JSON.parse(sessionStorage.getItem('isUserLoggedIn')))
  }, [])

  const fetchProductCallBack = () => {
    fetchProduct()
  }

  const handleProductSearch = (searchKey) => {
    if (searchKey) {
      let filterProduct = searchResult.filter((product) => product.name.toLowerCase().includes(searchKey.toLowerCase()));
      setProducts(filterProduct)
    } else {
      setProducts(searchResult)
    }
  }

  const handleFilter = (key) => {
    if (key.toLowerCase() === "all") {
      return fetchProduct()
    }
    const filtedProducts = searchResult.filter((p) => p.category.toLowerCase() === key.toLowerCase())
    setProducts(filtedProducts)
  }

  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} />
      <Header handleProductSearch={handleProductSearch} isUserLoggedIn={isUserLoggedIn} />
      <Suspense fallback={<Loader />}>
        <div style={{ padding: "10rem 0 5rem 0" }}>
          <Switch>
            <Route exact path="/" ><ProductList handleFilter={handleFilter} products={products} loading={loading} isUserLoggedIn={isUserLoggedIn} fetchProductCallBack={fetchProductCallBack} /></Route>
            <Route exact path="/product/:id"><Product isUserLoggedIn={isUserLoggedIn} fetchProductCallBack={fetchProductCallBack} /></Route>
            <Route exact path="/login"><Login /></Route>
            <Route exact path="/register"><Register /></Route>
            <Route exact path="/about"><About /></Route>
            <Route exact path="/chart"><ChartPage products={products} fetchProductCallBack={fetchProductCallBack} /></Route>
            <Route exact path="/addproduct"><AddProduct fetchProductCallBack={fetchProductCallBack} /></Route>
            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

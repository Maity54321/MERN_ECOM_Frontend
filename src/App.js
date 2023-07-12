import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import WebFont from "webfontloader";
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sign from "./components/users/sign";
import Dashboard from "./components/Admin/Dashboard";
import UpdateProduct from "./components/Admin/UpdateProduct";
import NotFound from "./components/NotFound";
import ParticularProduct from "./components/ParicularProduct";
import ViewProducts from "./components/Admin/ViewProducts";
import Cart from "./components/Cart/Cart";
import AdminWelcome from "./components/Admin/AdminWelcome";
import Search from "./components/common/Search";
import AllProducts from "./components/AllProducts";
import UserOptions from "./components/UserOptions";
import Shipping from "./components/Orders/Shipping";
import { decodeToken } from "react-jwt";
import ConfirmOrder from "./components/Orders/ConfirmOrder";
import PaymentSuccess from "./components/Orders/PaymentSuccess";
import MyOrders from "./components/Orders/MyOrders";
import UserOrderDetails from "./components/Orders/UserOrderDetails";

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const user = decodeToken(localStorage.getItem("token"))
  // const auth = ()=>{
  //   if(user){
  //     setIsAuthenticated(true);
  //     console.log(isAuthenticated);
  //   }
  // }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto"],
      },
    });
    window.scrollTo(0, 0);
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = decodeToken(token);
      setUser(decodedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };
  const login = (token) => {
    const decodedUser = decodeToken(token);
    setUser(decodedUser);
    setIsAuthenticated(true);
    // console.log(user);
  };

  return (
    <>
      <ToastContainer />
      <Header />
      {isAuthenticated && (
        <UserOptions user={user} handleLogout={logout} login={login} />
      )}
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/products/:id" element={<ParticularProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product" element={<AllProducts />} />
        <Route path="/product/:keyword" element={<AllProducts />} />
        <Route path="/account" element={<Sign login={login} logout={logout} />}>
          <Route path="createproduct" Component={Dashboard} />
          <Route path="/account" element={<AdminWelcome logout={logout} />} />
          <Route path="updateproduct/:id" element={<UpdateProduct />} />
          <Route path="viewproducts" element={<ViewProducts />} />
        </Route>
        {/* <Route path='/products/:id/cart' element={<Cart />} /> */}
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder user={user} />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/orderdetais/:id" element={<UserOrderDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./confirmOrder.css";
import { getCartItems } from "../../services/cartService";
import { myOrder } from "../../services/orderService";

const PaymentSuccess = () => {
  const reference = useSearchParams()[0];
  const payment_id = reference.get("reference");
  const shippingInfo = JSON.parse(localStorage.getItem("shipping"));
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const paymentInfo = {
    id: payment_id,
    status: "success",
  };

  const myCart = async () => {
    await getCartItems().then((res) => {
      setCart(res.data[0].cartItems);
    });
  };

  let subtotal = 0;
  if (cart.length !== 0) {
    subtotal = cart.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
  }
  const shippingCharge = subtotal >= 10000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const total = subtotal + shippingCharge + tax;

  useEffect(() => {
    myCart();
  }, []);

  const order = {
    shippingInfo,
    orderItems: cart,
    paymentInfo,
    itemsPrice: subtotal,
    taxPrice: tax,
    shippingPrice: shippingCharge,
    totalPrice: total,
  };

  const createOrder = async (order) => {
    await myOrder(order).then((res) => {
      console.log(res.data);
    });
  };

  if (cart.length !== 0) {
    createOrder(order);
    setTimeout(() => {
      navigate("/orders");
    }, 3000);
  }

  console.log(order);

  return (
    <div>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="flex flex-col items-center">
          <h1>Payment Successful</h1>
          <div>Payment Id: {payment_id}</div>
          <div className="mt-10">Redirecting to Orders...</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

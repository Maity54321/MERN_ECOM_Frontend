import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserOrderDetails } from "../../services/orderService";
import Loading from "../Loading/Loading";
// import "./confirmOrder.css";
import { decodeToken } from "react-jwt";
import { toast } from "react-toastify";

const UserOrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userOerderDetails = async (id) => {
    try {
      await getUserOrderDetails(id).then((res) => {
        console.log(res.data.order);
        setOrderDetails(res.data.order);
      });
    } catch (error) {
      return toast.error(error.response.data, {
        theme: "colored",
        position: "bottom-center",
      });
    }
  };

  useEffect(() => {
    userOerderDetails(id);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [id]);

  if (!localStorage.getItem("token")) {
    navigate("/account");
  }

  if (loading === false) {
    const checkToken = decodeToken(localStorage.getItem("token"));
    if (checkToken._id !== orderDetails.user._id) {
      navigate("/account");
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : orderDetails ? (
        <div>
          <div className="container min-h-screen">
            <div className="flex flex-col">
              <div className="flex md:flex-row flex-col items-center pt-20 ps-10 pe-10">
                <div className="flex flex-col border border-solid border-gray-300 md:w-1/2 w-full gap-2 ps-5 pb-5">
                  <h3 className="">Delivery Address</h3>
                  <div className="font-bold">{orderDetails.user.name}</div>
                  <div className="">{`${orderDetails.shippingInfo.address}, ${orderDetails.shippingInfo.city}`}</div>
                  <div className="">{`${orderDetails.shippingInfo.state}, ${orderDetails.shippingInfo.country}`}</div>
                  <div className="">
                    PIN Code: {`${orderDetails.shippingInfo.pinCode}`}
                  </div>
                  <div className="">
                    Phone Number: {`${orderDetails.shippingInfo.phone}`}
                  </div>
                </div>
                <div className="flex flex-col md:items-end items-start border border-solid border-gray-300 md:w-1/2 w-full gap-2 md:pe-5 ps-5 pb-5">
                  <h3>Receipt</h3>
                  <div className="flex flex-row w-2/5 justify-between">
                    <div>Total Items price:</div>
                    <div> &#8377;{orderDetails.itemsPrice}</div>
                  </div>
                  <div className="flex flex-row w-2/5 justify-between">
                    <div>GST:</div>
                    <div> &#8377;{orderDetails.taxPrice}</div>
                  </div>
                  <div className="flex flex-row w-2/5 justify-between">
                    <div>Shipping Charge:</div>
                    <div> &#8377;{orderDetails.shippingPrice}</div>
                  </div>
                  <div className="flex flex-row w-3/5 justify-between">
                    <hr className="w-full" />
                  </div>
                  <div className="flex flex-row w-2/5 justify-between">
                    <b>Total Price:</b>
                    <div> &#8377;{orderDetails.totalPrice}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ms-10 me-10 max-h-96 min-h-[180px] mt-10 gap-4 pt-2 pb-2 overflow-y-auto border border-solid border-gray-300">
                {orderDetails.orderItems.map((item) => (
                  <div
                    className="md:flex md:flex-row md:justify-evenly items-center grid grid-cols-2 w-full"
                    key={item._id}
                  >
                    <div className="h-40">
                      <img
                        src={item.product.images.imgUrl}
                        alt=""
                        className="h-40"
                      />
                    </div>
                    <div className="row-start-2 p-2">{item.product.name}</div>
                    <div className="text-center text-lg">
                      &#8377;{item.product.price}
                    </div>
                    <div className="text-center text-lg">
                      Qty: {item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>No Orders Found</h1>
      )}
    </>
  );
};

export default UserOrderDetails;

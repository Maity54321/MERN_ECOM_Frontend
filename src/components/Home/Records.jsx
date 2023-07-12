import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Records = ({ data }) => {
  const handleRating = (val) => {
    const options = {
      edit: true,
      color: "rgba(30,30,30,0.5)",
      activeColor: "Purple",
      size: window.innerWidth > 650 ? 20 : 20,
      value: val,
      isHalf: true,
    };
    return options;
  };
  return (
    <>
      {data.map((item) => (
        <div
          className="w-52 h-96 shadow-lg shadow-slate-500 rounded-lg mt-10 product-card-transition p-5 pb-10 ms-auto me-auto md:ms-5 border-none"
          key={item._id}
        >
          <Link
            to={`/products/${item._id}`}
            className="flex flex-col justify-center items-center no-underline text-black "
          >
            <img
              className="h-56 max-w-full"
              src={item.images.imgUrl}
              alt={item.images.host}
            />
            <div className="text-xl max-h-10 text-center mt-2 overflow-hidden truncation-padding w-full">
              {item.name}
            </div>
            <div className="flex justify-start">
              <ReactStars {...handleRating(item.ratings)} />
              <span className="m-2">({item.numOfReviews}) Reviews</span>
            </div>
            <div className="text-2xl font-bold">₹ {item.price}</div>
          </Link>

          <div className="flex flex-row justify-evenly items-baseline">
            <Link
              to={`/products/${item._id}`}
              className="p-3 border border-solid w-full h-max text-center font-bold text-lg rounded-full duration-700 bg-purple-800 text-white cursor-pointer hover:bg-white hover:text-purple-800 no-underline"
            >
              View details
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Records;

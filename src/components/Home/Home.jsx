import React from "react";
import "./home.css";
import { BsFillMouseFill } from "react-icons/bs";
import Product from "./Product";
import Metadata from "../Metadata";
import { Link } from "react-router-dom";
function Home() {

  return (
    <>
      <Metadata title="Techworld" />
      <div className="banner text-white">
        <div className="text-center md:text-2xl mb-5">
          Welcome To The TechWorld
        </div>
        <div className="text-[4vmax] font-bold">Start Shopping</div>
        <a href="#products">
          <button className="p-3 mt-5 text-lg  rounded-2xl cursor-pointer border-white hover:bg-transparent hover:text-white outline-none">
            Scroll {<BsFillMouseFill />}
          </button>
        </a>
      </div>

      <div className="text-center text-3xl font-semibold">
        Featured Products
      </div>
      <hr
        className="h-1 w-96 gradient-hr rounded-full border-none"
        id="products"
      />
      <Product />
    </>
  );
}

export default Home;

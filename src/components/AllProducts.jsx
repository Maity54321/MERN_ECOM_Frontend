import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { Link, useParams } from "react-router-dom";
import Records from "./Home/Records";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Metadata from "./Metadata";
import Loading from "./Loading/Loading";

const categories = ["Mobiles", "Monitors", "Laptops"];

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);
  const [price, setPrice] = useState([0, 99999]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allProducts.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const { keyword } = useParams();

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  const products = async () => {
    const result = await getProducts(keyword, price, category);
    setAllProducts(result.data);
  };

  useEffect(() => {
    products();
    // console.log(allProducts)
  }, [keyword, price, category]);

  // const handleRating = (val) => {
  //   const options = {
  //     edit: false,
  //     color: "rgba(30,30,30,0.5)",
  //     activeColor: "Purple",
  //     size: window.innerWidth > 650 ? 25 : 20,
  //     value: val,
  //     isHalf: true,
  //   };
  //   return options;
  // };

  const handleCategory = (cat) => {
    setCategory(cat);
    // console.log(cat);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
    // console.log(price);
  };

  return (
    <>
      <Metadata title={"All Products"} />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-row">
          <div className="border border-solid border-gray-400 mt-24 md:w-64 w-full h-96 z-[1] md:block hidden">
            <Typography align="center" variant="h6">
              Price
            </Typography>
            <div className="w-5/6 ms-auto me-auto">
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={99999}
                // size={"small"}
                color="secondary"
              />
            </div>

            <Typography align="center" variant="h6">
              Categories
            </Typography>
            <ul>
              {categories.map((item, index) => (
                <li
                  className="list-none pt-1 cursor-pointer duration-500 text-gray-500 hover:text-purple-800"
                  key={index}
                  onClick={() => handleCategory(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <div className="md:grid md:grid-cols-4 mt-16">
              <Records data={currentRecords} />
            </div>
            <div className="w-full flex justify-center items-center">
              {recordsPerPage < allProducts.length && (
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={recordsPerPage}
                  totalItemsCount={allProducts.length}
                  onChange={setCurrentPage}
                  nextPageText={"Next"}
                  prevPageText={"Prev"}
                  firstPageText={"1st"}
                  lastPageText={"Last"}
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;

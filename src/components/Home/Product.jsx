// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import ReactStars from "react-rating-stars-component";
// import { getProducts, getImages } from "../../services/productService";
// import Pagination from "../common/Pagination";
// import Records from "./Records";
// // import {getProduct} from '../ParicularProduct'
// // import 'bootstrap/dist/css/bootstrap.css';
// // import 'bootstrap/dist/js/bootstrap.js';

// export default class Product extends Component {
//   state = {
//     products: [],
//     loading:true,
//     currentPage:1,
//     recordsPerPage:1,
//   };

//     indexOfLastRecord = this.state.currentPage * this.state.recordsPerPage;
//     indexOfFirstRecord = this.indexOfLastRecord - this.state.recordsPerPage;
//     currentRecords = this.state.products.slice(this.indexOfFirstRecord, this.indexOfLastRecord);
//     totalPages = Math.ceil(this.state.products.length / this.state.recordsPerPage);

//   async componentDidMount() {
//     const { data: products } = await getProducts();
//     const {data} = await getImages()
//     // console.log(data);
//     this.setState({ products: products });

//   }

//   handleRating(val){

//     const options = {
//     edit: false,
//     color: "rgba(30,30,30,0.5)",
//     activeColor: "Purple",
//     size: window.innerWidth > 650 ? 25 : 20,
//     value: val,
//     isHalf: true,
// }
// return options;
// }

//   render() {
//     return (
//       <>
//         {/* {this.state.products.map((item)=>(

//           <div className="w-56 h-96  shadow-lg shadow-slate-500 rounded-lg mt-10 product-card-transition p-5 pb-10 ms-auto me-auto md:ms-5 border-none" key={item._id}>
//           <Link to={`/products/${item._id}`} className="flex flex-col justify-center items-center no-underline text-black ">
//           <img
//             className="h-56"
//             src={"http://" + item.images.host}
//             alt={item.images.host}
//           />
//           <div className="text-xl max-h-10 text-center mt-2 overflow-hidden truncation-padding">{item.name}</div>
//           <div className="flex justify-start">
//             <ReactStars {...this.handleRating(item.rating)} />
//             <span className="m-2">({item.numOfReviews}) Reviews</span>
//             </div>
//             <div className="text-2xl font-bold">₹ {item.price}</div>
//         </Link>
//         <div className="flex flex-row justify-evenly items-baseline">
//             <Link to={localStorage.getItem("token") ? "/products/"+item._id+"/cart": "/account"} className=" p-3 border border-solid w-full h-max text-center font-bold text-sm rounded-full duration-700 bg-purple-800 text-white cursor-pointer hover:bg-white hover:text-purple-800 no-underline" >Add To Cart</Link>
//             <div className="p-3 border border-solid w-full h-max text-center font-bold text-sm rounded-full duration-500 bg-purple-800 text-white cursor-pointer hover:bg-white hover:text-purple-800">Buy Now</div>
//           </div>
//           </div>
//         ))} */}

//         <Records data={this.state.products} />
//         <Pagination
//         totalpages={this.totalPages}
//         currentPage={this.state.currentPage}
//         // setCurrentPage={this.setState({currentPage:this.state.currentPage})}
//          />
//       </>
//     )
//   }
// }

import React, { useEffect, useState } from "react";
import { getProducts, getImages } from "../../services/productService";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
// import  Pagination  from '../common/Pagination';
import Records from "./Records";
import Pagination from "react-js-pagination";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [recordsPerPage] = useState(8);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = products.slice(indexOfFirstRecord, indexOfLastRecord);
  // const totalPages = Math.ceil(products.length / recordsPerPage);



  const getAllProducts = async () => {
    // console.log(keyword);
    const res = await getProducts();
    setProducts(res.data);
  };
  useEffect(() => {
    getAllProducts();
    // console.log(products);
    setLoading(false);
  }, []);

  return (
    <>
      <div className="md:grid md:grid-cols-4 md:w-10/12 md:ms-32" >
        <Records data={currentRecords} />
      </div>
      {/* <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      /> */}
      {/* <Pagination
        activePage={currentPage}
        itemsCountPerPage={recordsPerPage}
        totalItemsCount={products.length}
        onChange={setCurrentPage}
        nextPageText={"Next"}
        prevPageText={"Prev"}
        firstPageText={"1st"}
        lastPageText={"Last"}
        itemClass="page-item"
        linkClass="page-link"
        activeClass="pageItemActive"
        activeLinkClass="pageLinkActive"
      /> */}
    </>
  );
};

export default Product;

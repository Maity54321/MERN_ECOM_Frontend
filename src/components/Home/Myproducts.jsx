// import React, { Component } from "react";
// import { getProducts } from "../../services/productService";
// // import Product from "./Product";
// import Metadata from "../Metadata";
// import { BsFillMouseFill } from "react-icons/bs";
// import ReactStars from "react-rating-stars-component";
// import { Link } from "react-router-dom";

// export default class Myproducts extends Component {
//   state = {
//     products: [],
//   };

//   async componentDidMount() {
//     const { data:products} = await getProducts();
//     // console.log(data);
//     this.setState({ products: products });
//   }

// handleRating(val){

//         const options = {
//         edit: false,
//         color: "rgba(30,30,30,0.5)",
//         activeColor: "Purple",
//         size: window.innerWidth > 650 ? 25 : 20,
//         value: val,
//         isHalf: true,
//     }
//     return options;
// }

  
//   render() {
   

//     return (
//       <>
//         <Metadata title="Techworld" />
//         <div className="banner text-white">
//           <div className="text-center md:text-2xl mb-5">
//             Welcome To The TechWorld
//           </div>
//           <div className="text-[4vmax] font-bold">Start Shopping</div>
//           <a href="#products">
//             <button className="p-3 mt-5 text-lg  rounded-2xl cursor-pointer border-white hover:bg-transparent hover:text-white outline-none">
//               Scroll {<BsFillMouseFill />}
//             </button>
//           </a>
//         </div>

//         <div className="text-center text-3xl font-semibold">
//           Featured Products
//         </div>
//         <hr className="h-1 w-96 gradient-hr rounded-full border-none" />
//         <div
//           className="md:grid md:grid-cols-4 md:w-10/12 md:ms-32"
//           id="products"
//         >
//           {this.state.products.map((item) => (
//             <div className="w-56 border-none shadow-lg shadow-slate-500 rounded-lg mt-10 product-card-transition p-5 ms-auto me-auto md:ms-5">
//               <Link
//                 to={item._id}
//                 className="flex flex-col justify-center items-center no-underline text-black "
//               >
//                 <div className="text-xl text-center mt-2">{item.name}</div>
//                 <div className="flex justify-start">
//                 <ReactStars {...this.handleRating(item.rating)} /> 
//                   <span className="m-2">Reviews {item.numOfReviews}</span>
//                 </div>
//                 <div className="text-2xl font-bold">{item.price}</div>
//                 {/* </div> */}
//               </Link>
//             </div>
//           ))}
//         </div>
//       </>
//     );
//   }
// }

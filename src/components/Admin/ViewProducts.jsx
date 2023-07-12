import React, { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../services/productService";
import {BiSearchAlt} from 'react-icons/bi';
import {RiFileEditFill} from 'react-icons/ri';
import {BsFillTrash2Fill} from 'react-icons/bs'
import { Link } from "react-router-dom";
import swal from 'sweetalert';



const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const res = async () => {
      try{
      const products = await getProducts();
      setProducts(products.data);
      // console.log(products);
      }catch(error){
        console.log(error.response.data);
      }
    };
    res();
  }, []);

  const search = (e)=>{
    setSearchInput(e.target.value);
    const newArr = products.filter((item)=>{
      if(item.name.toLowerCase().indexOf(searchInput.toLowerCase())>-1 && item.name.toLowerCase().includes(searchInput.toLowerCase())){
          return true
      }
      else{
          // console.log(item.name);
        return false
      }
    })
    setProducts(newArr);

    // searched()
  }

  // const searched = ()=>{
  //   const newArr = products.filter((item)=>{
  //       // console.log(item.name);
  //       if(item.name.toLowerCase().indexOf(searchInput.toLowerCase())>-1 && item.name.toLowerCase().includes(searchInput.toLowerCase())){
  //           // console.log(item.name);
  //           // setProducts(item.name);
  //           // console.log(item);
  //           return true
  //       }
  //       else{
  //           console.log(item.name);
  //         return false
  //       }
  //   })
  //   // console.log(newArr);
  //   setProducts(newArr);
  // }

  const productDelete = async(id)=>{
    // if(window.confirm("Are You Sure?")){
    // try {
    //   const res = await deleteProduct(id).then((response)=>{
    //   });
    //   const updatedProducts = products.filter((item) =>{
    //     return item._id !== id
    //   });
    //   setProducts(updatedProducts)
    //   // console.log(updatedProducts);
    // // } catch (error) {
    //   console.log(error.response.data);
    // }

    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        try {
          const res = deleteProduct(id).then((response)=>{
          });
          const updatedProducts = products.filter((item) =>{
            return item._id !== id
          });
          setProducts(updatedProducts)
          // console.log(updatedProducts);
        } catch (error) {
          console.log(error.response.data);
        }
        swal("Product has been deleted!", {
          icon: "success",
        });
      } else {
        swal({title:"Product is safe!"});
      }
    });
   
    // setProducts(products)
  }
  // console.log(products);

  // console.log(products);


  return (
    <>
      <div className="flex flex-row justify-center items-center p-3">
      <div className="flex flex-row justify-center items-center bg-purple-700 p-1 rounded-xl">
      <div className="bg-fixed ms-5">
      <BiSearchAlt size={25} color="white" />
      </div>
        <input
          type="text"
          name=""
          id=""
          className="p-2 border-none outline-none rounded-lg w-full font-cursive text-lg bg-transparent text-white placeholder-white"
          placeholder={"Search"}
          onChange={search}
          value={searchInput}
        />
        </div>
          

      </div>
      <div className="flex flex-row border border-solid justify-evenly text-center p-3 md:text-xl font-bold">
        <div className="w-full">Product Name</div>
        <div className="w-full">Product Id</div>
        <div className="w-full">Stock</div>
        <div className="w-full">Action</div>

      </div>
      {products.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-4 text-center border border-solid justify-center items-center"
        >
          <div className="p-2 text-lg">{item.name}</div>
          <div className="p-2 md:text-lg break-words">{item._id}</div>
          <div className="p-2 text-lg">{item.stock}</div>
          <div className="p-2 text-xl flex flex-row justify-evenly">
            <Link to={`/account/updateproduct/${item._id}`} className="cursor-pointer text-purple-700"> <RiFileEditFill /> </Link>
            <div className="cursor-pointer text-red-600" onClick={()=>productDelete(item._id)}><BsFillTrash2Fill /></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ViewProducts;

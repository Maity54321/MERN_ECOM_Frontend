import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Joi from "joi-browser";
import { createProduct } from "../../services/productService";
import { toast } from "react-toastify";
import "./dashboard.css";
import Navbars from "./Navbars";

function Dashboard() {
  const navigate = useNavigate();
  // const logout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/account");
  // };

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    rating: 0,
    // images:"",
    category: "",
    stock: "",
    numOfReviews: 0,
    reviews: {
      name: "Maity",
      rating: 0,
      comment: "Faltu",
    },
  });
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState("/Profile.png");
  const dropdown = useRef(null);

  const productSchema = {
    name: Joi.string().required().label("Product Name"),
    description: Joi.string().required().label("Product Description"),
    price: Joi.number().required().label("Product price"),
    rating: Joi.number().default(0),
    images: Joi.string(),
    category: Joi.string()
      .regex(/^[a-z A-Z]*$/)
      .required()
      .label("Category"),
    stock: Joi.number().required().default(1).label("Stock"),
    numOfReviews: Joi.number().default(0),
    reviews: Joi.object(),
  };

  const {
    name,
    description,
    price,
    rating,
    // images,
    category,
    stock,
    numOfReviews,
    reviews,
  } = productData;

  const renderInput = (name, type, placeholder) => {
    // const { productData } = productData;
    return (
      <Input
        name={name}
        placeholder={placeholder}
        type={type}
        value={productData[name]}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImages(e.target.files[0]);
      // const reader = new FileReader();
      // reader.onload = () =>{
      //   if(reader.readyState === 2){
      //     setImages(reader.result)
      //   }
      // }
      // reader.readAsDataURL(e.target.files[0]);
    } else {
      const errorMessage = validateProperty(e.target);
      // console.log(errorMessage);
      if (errorMessage) {
        setErrors({ ...errors, [e.target.name]: errorMessage });
        // console.log(errors);
      } else {
        delete setErrors({ ...errors, [e.target.name]: errorMessage });
      }

      // const loginData = {...productData };
      // loginData[input.name] = input.value;
      // // this.setState({ loginData, errors });
      // setProductData(productData)

      setProductData({ ...productData, [e.target.name]: e.target.value });
      // setErrors(errors)
      // console.log(errors);
    }
  };

  const productValidate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(productData, productSchema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      error[item.path[0]] = item.message;
      // console.log(error[item.path[0]]);
      return errors;
    }
  };

  const validateProperty = ({ name, value }) => {
    const obj = { name: value };
    var schema = { name: productSchema[name] };
    // console.log(schema);
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const createProducts = async (e) => {
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("rating", rating);
    myForm.set("productImage", images);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("numOfReviews", numOfReviews);
    // myForm.set("reviews", reviews);
    try {
      const res = await createProduct(myForm).then((response) => {
        toast.success("Product Added to the Store Successfully", {
          theme: "colored",
        });
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const errors = productValidate();
    setErrors(errors || {});
    if (errors) return;

    createProducts();
    console.log("Product Created");
  };

  return (
    <>
      <div className="mt-5 flex justify-center items-center">
        <form
          onSubmit={handleCreateProduct}
          className="md:w-2/4 w-5/6 flex flex-col justify-evenly items-center bg-purple-800 p-7 rounded-3xl h-max"
        >
          {/* <Input type="text" placeholder="Product Name" /> */}
          <div className="w-full mb-7">
            {renderInput("name", "text", "Product Name")}
          </div>
          <textarea
            onChange={handleChange}
            className="p-3 w-2/3 rounded-lg border-none outline-none font-cursive text-black text-lg shadow-black shadow-md mb-14"
            name="description"
            id=""
            cols="30"
            rows="2"
            placeholder="Description of the Product"
          ></textarea>
          <div className="w-full mb-7">
            {renderInput("price", "text", "Price Of Product")}
          </div>
          <div className="w-full mb-7">
          {renderInput("image", "file", "Product Image")}
          </div>
          <div className="w-full mb-7">
          {renderInput("category", "text", "Category Of Product")}
          </div>
          <div className="w-full mb-7">
          {renderInput("stock", "number", "Product stock")}
          </div>
          <button
            className='p-2 ms-auto me-auto w-1/2 rounded-lg border-none mt-5 cursor-pointer text-lg font-cursive hover:text-purple-800 text-purple-800 shadow-black shadow-md'
            type="submit"
            disabled={productValidate()}
          >
            Add Product
          </button>
        </form>
      </div>
      {/* <div className="flex justify-center items-center mt-52">
        <button
          onClick={logout}
          className="p-3 w-28 border-none rounded-full bg-purple-900 text-white shadow-md shadow-black cursor-pointer"
        >
          Logout
        </button>
      </div> */}
    </>
  );
}

export default Dashboard;

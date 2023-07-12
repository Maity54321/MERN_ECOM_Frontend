import React, { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import Input from "../common/Input";
import {
  getParticularProduct,
  updateProduct,
} from "../../services/productService";
import { toast } from "react-toastify";
import  Joi  from "joi-browser";

function UpdateProduct() {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [errors, setErrors] = useState([]);
  const [images, setImages] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const updateProductSchema = {
    // id:Joi.string().required(),
    name: Joi.string().required().label("Product Name"),
    description: Joi.string().required().label("Product Description"),
    price: Joi.string().required().label("Product Price"),
    category: Joi.string()
      .regex(/^[a-z A-Z]*$/)
      .required()
      .label("Category"),
    stock: Joi.string().required().default(1).label("Stock"),
  };

  useEffect(() => {
    const upData = async () => {
      try {
        await getParticularProduct(id).then((res) => {
          setProduct(viewModel(res.data.product));
          // console.log(res.data.product);
        });
      } catch (error) {
        console.log(error.response.data);
      }
    };
    upData();
  }, []);

  const validateProperty = ({name, value}) =>{
    const obj = {name:value};
    const schema = {name:updateProductSchema[name]};
    const {error} = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImages(e.target.files[0]);
    } else {
      const errorMessage = validateProperty(e.target);
      if(errorMessage){
        setErrors({...errors, [e.target.name]:errorMessage})
      }else{
        delete setErrors({...errors, [e.target.name]:errorMessage})
      }
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const viewModel = (product) => {
    return {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    };
  };


  const renderInput = (name, type, placeholder) => {
    return (
      <Input
        name={name}
        placeholder={placeholder}
        type={type}
        value={product[name]}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const updateProductValidate = ()=>{
    const options = {abortEarly:false};
    const {error} = Joi.validate(product, updateProductSchema, options);
    if(!error) return null;
    const errors = {};
    for(let item of error.details){
      error[item.path[0]] = item.message;
      return errors;
    }
  }
  

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const errors = updateProductValidate();
    setErrors(errors || {});
    if(errors){
      console.log(errors);;
    };
    try {
      await updateProduct(product);
      toast.success("Product Updated Successfully", { theme: "colored" });
    } catch (error) {
      console.log(error.response.data);
    }
    navigate("/account/viewproducts");
  };

  return (
    <>
      <div className="mt-5 flex justify-center items-center">
        <form
          onSubmit={handleUpdateProduct}
          className="md:w-2/4 w-5/6 flex flex-col justify-evenly items-center bg-purple-800 p-7 rounded-3xl h-max"
        >
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
            value={product.description}
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
            // disabled={updateProductValidate()}
          >
            Update Product
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateProduct;

import React, { useEffect, useState } from "react";
import Input from "../common/Input";
import { BsBuildingFill, BsHouseFill, BsPhoneFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Metadata from '../Metadata'

const Shipping = () => {
  const [shippingInfo, setShippingInfo] = useState({
    address:"",
    city:"",
    pinCode:"",
    phone:"",
    country:"",
    state:""
  });
  const {address, city, pinCode, phone, country, state} = shippingInfo;
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();

  const shippingSchema = {
    address:Joi.string().required().label("Address"),
    city:Joi.string().required().label("City"),
    pinCode:Joi.number().required().min(100000).max(999999).label("Pin Code"),
    phone:Joi.number().required().min(1000000000).max(9999999999).label("Phone Number"),
    country:Joi.string().label("Country"),
    state:Joi.string().label("State")
  }
  const validateProperty = ({name, value})=>{
    const obj = {name:value};
    const schema = {name:shippingSchema[name]};
    const {error} = Joi.validate(obj,schema);
    return error ? error.details[0].message : null
  }

  const handleChange = (e) => {

    const errorMessage = validateProperty(e.target);
    if(errorMessage){
      setErrors({...errors, [e.target.name]:errorMessage})
    }else{
      delete setErrors({...errors, [e.target.name]:errorMessage})
    }

    setShippingInfo({...shippingInfo,[e.target.name]:e.target.value})
  };
  const handleContinue = (e)=>{
    e.preventDefault();
    if(country !== ""){
      if(state === ""){
        toast.error("Please Select your State",{theme:"colored", position:"bottom-center"})
      }else{
        localStorage.setItem("shipping", JSON.stringify(shippingInfo));
        navigate('/order/confirm');
      } 
    }else{
      toast.error("Please Choose Your Country",{theme:"colored", position:"bottom-center"})
    }
    
    // console.log(shippingInfo);
  }

  useEffect(()=>{
    if (!localStorage.getItem("token")) {
          navigate('/cart')
      }
  })

  const renderInput = (name, type, placeholder) => {
    return (
      <Input
        name={name}
        placeholder={placeholder}
        type={type}
        value={shippingInfo[name]}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };
  return (
    <>
    <Metadata title={"Shipping Details"} />
      <div className="flex flex-row justify-center items-center w-full min-h-full">
        <form action="" className="border border-solid w-96 bg-purple-800 mt-10 rounded-2xl" onSubmit={handleContinue}>
          <div className="flex flex-col items-center justify-evenly w-full min-h-[500px]">
            <div className="flex flex-row items-center w-full">
              <BsHouseFill className="text-black absolute text-2xl ms-12" />
              {renderInput("address", "text", "Address")}
            </div>
            <div className="flex flex-row items-center w-full">
              <BsBuildingFill className="text-black absolute text-2xl ms-12" />
              {renderInput("city", "text", "City")}
            </div>
            <div className="flex flex-row items-center w-full">
              <MdLocationOn className="text-black absolute text-2xl ms-12" />
              {renderInput("pinCode", "text", "Pin Code")}
            </div>
            <div className="flex flex-row items-center w-full">
              <BsPhoneFill className="text-black absolute text-2xl ms-12" />
              {renderInput("phone", "text", "Phone")}
            </div>
            <select
              name="country"
              id=""
              className="p-3 ps-10 w-2/3 rounded-lg border-none outline-none font-cursive text-black text-lg shadow-black shadow-md"
              value={country}
              onChange={handleChange}
            >
              <option value="">Country</option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option value={item.isoCode} key={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
            {Country && (
              <select
                name="state"
                id=""
                className="p-3 ps-10 w-2/3 rounded-lg border-none outline-none font-cursive text-black text-lg shadow-black shadow-md"
                value={state}
                onChange={handleChange}
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            )}
          <button
            className='p-2 ms-auto me-auto w-1/2 rounded-lg border-none mt-5 cursor-pointer text-lg font-cursive hover:text-purple-800 text-purple-800 shadow-black shadow-md'
            type="submit"
            // disabled={true}
          >Continue</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Shipping;

import React from "react";
import "../users/loginSignUp.css"
import {FiMail} from "react-icons/fi"

function Input({ name, error, placeholder, type, ...rest }) {
  return (
    <>
        <input
          {...rest}
          name={name}
          type={type}
          placeholder={placeholder}
        />
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute mt-24 duration-1000"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            </span>
          </div>
        )}
    </>
  );
}

export default Input;

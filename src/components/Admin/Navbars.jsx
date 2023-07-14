import React, { useRef } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";

function Navbars() {
  const navigate = useNavigate();
  const dropdown = useRef(null);

  const showHide = () => {
    for (let i = 0; i < dropdown.current.classList.length; i++) {
      if (dropdown.current.classList[i] === "hidden") {
        return dropdown.current.classList.remove("hidden");
      }
    }
    dropdown.current.classList.add("hidden");
    // console.log("");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/account");
  };
  const activate = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "black" : "white",
      textShadow: isActive ? "2px 2px 2px white" : "",
    };
  };
  return (
    <>
      <div className="p-1 bg-purple-800 text-white md:m-0 flex flex-row md:w-full w-6/7 ms-12">
        <div className="place-self-center w-1/3 text-xl ps-3 md:block hidden">
          This is Dashboard
        </div>
        <div className="place-self-center text-center md:w-1/3 w-1/2 text-xl">
          Welcome Admin
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-3 bg-purple-700 md:w-4/5 w-4/5 me-0 ms-auto md:me-auto text-white p-2">
        <div className="place-self-end">
          <div
            className="text-white no-underline text-xl md:hidden border cursor-pointer"
            onClick={showHide}
          >
            Operations
            <span className="md:hidden text-xl">
              <IoMdArrowDropdown />
            </span>
          </div>
        </div>
        <div className="md:flex md:flex-row gap-3 hidden" ref={dropdown}>
          <div className="text-end">
            <NavLink
              to="/account"
              style={activate}
              className="text-white no-underline text-xl"
              onClick={showHide}
            >
              Admin Home
            </NavLink>
          </div>
          <div className="text-end">
            <NavLink
              to="createproduct"
              style={activate}
              className="text-white no-underline text-xl"
              onClick={showHide}
            >
              Create Product
            </NavLink>
          </div>
          {/* <div className="text-end">
            <NavLink
              to="updateproduct"
              className="text-white no-underline text-xl"
              style={activate}
              onClick={showHide}
            >
              Update Product
            </NavLink>
          </div> */}
          <div className="text-end">
            <NavLink
              to="viewproducts"
              className="text-white no-underline text-xl"
              style={activate}
              onClick={showHide}
            >
              View All Products
            </NavLink>
          </div>
        </div>
        {/* <div>Update Product</div> */}
      </div>
      <Outlet />
    </>
  );
}

export default Navbars;

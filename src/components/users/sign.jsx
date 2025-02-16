import React from "react";
import LogSignForm from "./LogSignForm";
import Joi from "joi-browser";
import { loginUser, registerUser } from "../../services/userService";
import { toast } from "react-toastify";
import "./loginSignUp.css";
import history from "history/browser";
import Account from "./Account";
// import jwt from 'jsonwebtoken';
// import config from 'config';
import { decodeToken } from "react-jwt";
import Dashboard from "../Admin/Dashboard";
import Navbars from "../Admin/Navbars";
import AdminWelcome from "../Admin/AdminWelcome";
import { FiMail } from "react-icons/fi";
import { IoLockOpenOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";

class Sign extends LogSignForm {
  constructor(props) {
    super(props);
    this.switchbtn = React.createRef();
  }

  state = {
    regData: { email: "", password: "", name: "" },
    loginData: { email: "", password: "" },
    errors: {},
    image: null,
  };

  regSchema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
    name: Joi.string()
      .regex(/^[a-z A-Z]*$/)
      .required()
      .label("Name"),
    // image:Joi.string().required().label("Profile Pic")
  };

  loginSchema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  onFileChange = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  registerSubmit = async () => {
    let email = this.state.regData.email;
    let password = this.state.regData.password;
    let name = this.state.regData.name;
    let image = this.state.image;

    const myForm = new FormData();
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("name", name);
    myForm.append("images", image);
    try {
      const res = await registerUser(myForm);
      console.log("Registered Successfully");
      toast.success("registered Successfully", { theme: "colored" });
    } catch (error) {
      // console.log(error.response);
      toast.error(error.response.data, { theme: "colored" });
    }
  };

  loginSubmit = async () => {
    try {
      const res = await loginUser(this.state.loginData).then((response) => {
        //  console.log(response.data);
        localStorage.setItem("token", response.data);

        // window.location = "http://localhost:3000";
        history.back();
      });
    } catch (error) {
      // console.log(error.response.data);
      toast.error(error.response.data);
    }
    this.logInTest();
  };

  switchTabs(e, tab) {
    if (tab === "login") {
      // this.switchbtn.currentTarget.classList.add("backNormal");
      // this.switchbtn.current.classList.remove("shiftRight");
      // this.registerTab.current.classList.remove("signupShiftLeft");
      // this.logInTab.current.classList.remove("loginShiftLeft");
      document.getElementById("switch").classList.add("backNormal");
      document.getElementById("switch").classList.remove("shiftRight");
      document
        .getElementById("registerTab")
        .classList.remove("signupShiftLeft");
      document.getElementById("loginTab").classList.remove("loginShiftLeft");
    }
    if (tab === "register") {
      // this.switchbtn.current.classList.remove("loginForm");
      // this.switchbtn.current.classList.add("shiftRight");
      // this.registerTab.current.classList.add("signupShiftLeft");
      // this.logInTab.current.classList.add("loginShiftLeft");

      document.getElementById("switch").classList.add("shiftRight");
      document.getElementById("switch").classList.remove("loginForm");
      document.getElementById("registerTab").classList.add("signupShiftLeft");
      document.getElementById("loginTab").classList.add("loginShiftLeft");
    }
  }

  logInTest = () => {
    if (localStorage.getItem("token")) {
      this.props.login(localStorage.getItem("token"));
    }
  };

  render() {
    if (localStorage.getItem("token")) {
      // window.location = "http://localhost:3000"
      const user = decodeToken(localStorage.getItem("token"));
      // console.log(user);
      if (user.isAdmin) {
        return (
          <>
            <Navbars />
          </>
        );
      } else {
        return (
          <>
            <Account userProfile={user} logout={this.props.logout} />
            {/* <h1>{user}</h1> */}
          </>
        );
      }
    }
    return (
      <>
        <div className="w-screen flex items-center justify-center min-h-screen">
          <div className="md:w-1/3 w-3/4 bg-purple-800 md:h-[40vmax] h-[80vh] border border-solid rounded-3xl overflow-hidden shadow-lg shadow-black">
            <div className="grid grid-rows-1 grid-cols-2">
              <div
                id="login"
                className="text-center p-3 text-2xl text-white font-roboto cursor-default"
                onClick={(e) => this.switchTabs(e, "login")}
              >
                LogIn
              </div>
              <div
                className="text-center p-3 text-2xl text-white font-roboto cursor-default"
                onClick={(e) => this.switchTabs(e, "register")}
              >
                SignUp
              </div>
              <button
                id="switch"
                ref={this.switchbtn}
                className="h-1 rounded-full border-none transition-all duration-500"
              ></button>
            </div>
            <form
              id="loginTab"
              onSubmit={this.handleLoginSubmit}
              className="loginForm mt-16 w-full flex flex-col gap-14 items-center justify-evenly transition-all duration-500"
            >
              <div className="flex flex-row w-full">
                <span className="text-2xl pt-4 absolute">
                  <FiMail className="md:ms-14 ms-9" color="purple" />
                </span>
                {this.renderLoginInput("email", "email", "Email")}
              </div>
              <div className="flex flex-row w-full">
                <span className="text-2xl pt-4 absolute">
                  <IoLockOpenOutline
                    className="md:ms-14 ms-9 pe-1"
                    color="purple"
                  />
                </span>
                {this.renderLoginInput("password", "password", "Password")}
              </div>

              {/* {this.renderInput("name", "text", "Enter Your Name")} */}
              {/* <input
                type="submit"
                value="Login"
                className="p-2 ms-auto me-auto w-1/2 rounded-lg border-none mt-5 cursor-pointer bg-white text-lg font-cursive hover:bg-slate-200 hover:text-purple-800 text-purple-800 shadow-black shadow-md"
              /> */}
              <button
                type="submit"
                className="p-2 ms-auto me-auto w-1/2 rounded-lg border-none mt-5 cursor-pointer text-lg font-cursive hover:text-purple-800 text-purple-800 shadow-black shadow-md"
                disabled={this.logValidate()}
              >
                Login
              </button>
            </form>
            <form
              id="registerTab"
              onSubmit={this.handleRegisterSubmit}
              className="signupForm mt-28 w-full flex flex-col gap-10 items-center justify-center transition-all duration-500"
            >
              <div className="flex flex-row w-full">
                <span className="text-2xl pt-4 absolute">
                  <FiMail className="md:ms-14 ms-9" color="purple" />
                </span>
                {this.renderRegInput("email", "email", "Email")}
              </div>
              <div className="flex flex-row w-full">
                <span className="text-2xl pt-4 absolute">
                  <IoLockOpenOutline className="md:ms-14 ms-9" color="purple" />
                </span>
                {this.renderRegInput("password", "password", "Password")}
              </div>
              <div className="flex flex-row w-full">
                <span className="text-2xl pt-4 absolute">
                  <IoPersonOutline className="md:ms-14 ms-9" color="purple" />
                </span>
                {this.renderRegInput("name", "text", "Enter Your Name")}
              </div>
              <div className="flex flex-row w-full">
                <span className="text-2xl pt-4 absolute">
                  <IoLockOpenOutline
                    className="md:ms-14 ms-9 pe-1"
                    color="purple"
                  />
                </span>
                {/* {this.renderLoginInput("image", "file", "Prifile Pic")} */}
              </div>
              <input
                type="file"
                name="image"
                id=""
                onChange={this.onFileChange}
              />
              {/* <input
                type="submit"
                value="Register"
                // className="p-2 ms-auto me-auto w-1/2 rounded-lg border-none mt-5 cursor-pointer bg-white text-lg font-cursive hover:bg-slate-200 hover:text-purple-800 text-purple-800 shadow-black shadow-md"
              /> */}
              <button
                type="submit"
                className="p-2 ms-auto me-auto w-1/2 rounded-lg border-none mt-5 cursor-pointer text-lg font-cursive hover:text-purple-800 text-purple-800 shadow-black shadow-md"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Sign;

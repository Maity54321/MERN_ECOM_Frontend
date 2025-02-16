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
import "./loginSignUp.css";

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
        <div className="logSign">
          <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true"></input>
            <div className="signup">
              <form onSubmit={this.handleLoginSubmit}>
                <label for="chk" aria-hidden="true">Login</label>
                <div className="flex flex-row w-full">
                  {this.renderLoginInput("email", "email", "Email")}
                </div>
                <div className="flex flex-row w-full">
                  {this.renderLoginInput("password", "password", "Password")}
                </div>
                <button className="cBtn"
                  type="submit"
                  disabled={this.logValidate()}
                >
                  Login
                </button>
              </form>
              </div>
              <div className="login">
              <form onSubmit={this.handleRegisterSubmit}>
                <label for="chk" aria-hidden="true">Sign Up</label>
                <div className="flex flex-row w-full">
                  {this.renderRegInput("email", "email", "Email")}
                </div>
                <div className="flex flex-row w-full">
                  {this.renderRegInput("password", "password", "Password")}
                </div>
                <div className="flex flex-row w-full">
                  {this.renderRegInput("name", "text", "Enter Your Name")}
                </div>
                <div className="flex flex-row w-full">
                </div>
                <input
                  type="file"
                  name="image"
                  id=""
                  onChange={this.onFileChange}
                />
                <button className="cBtn"
                  type="submit"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Sign;

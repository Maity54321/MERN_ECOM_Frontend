import { React, useRef, useState } from "react";
import { Link } from "react-router-dom";
import './loginSignUp.css';
import {registerUser} from '../../services/userService'
import { toast } from "react-toastify";
// import Axios from "axios";

function LoginSignupForm() {
  const switchbtn = useRef(null);
  const logInTab = useRef(null);
  const registerTab = useRef(null);

  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLoginPassword] = useState("");

   const [user, setUser] = useState({
    name: "",
    email: "",
    Password: "",
  });

  // const [avatar, setAvatar] = useState("/Profile.png");
  // const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const { name, email, password } = user;

  const logInSubmit = (e) => {
    e.preventDefault();
    console.log("Logged In Successfully");
  };

  

  const myForm = new FormData();

  myForm.set("name", name);
  myForm.set("email", email);
  myForm.set("password", password);
  // myForm.set("avatar", avatar);

  const registerSubmit = (e) => {
    e.preventDefault();
    try {
      registerUser(myForm).then((res)=>{
        toast.success(`${res.data.name}, You are registered Successfully`);
      });
    } catch (error) {
      console.log(error)
    }
    setUser("");
  };


  const registerDataChange = (e) => {
    // if (e.target.name === "avatar") {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     if (reader.readyState === 2) {
    //       setAvatarPreview(reader.result);
    //       setAvatar(reader.result);
    //     } 
    //   };
    //   reader.readAsDataURL(e.target.files[0]);
    // }else {
      setUser({ ...user, [e.target.name]: e.target.value });
    // }
  };

  const switchTabs = (e, tab)=>{
    
    if(tab === "login"){
      switchbtn.current.classList.add("backNormal");
      switchbtn.current.classList.remove("shiftRight");
      registerTab.current.classList.remove("signupShiftLeft");
      logInTab.current.classList.remove("loginShiftLeft");
      // logInTab.current.classList.add("backNormalForm");
    }

    if(tab === "register"){
      switchbtn.current.classList.remove("loginForm");
      switchbtn.current.classList.add("shiftRight");
      registerTab.current.classList.add("signupShiftLeft");
      logInTab.current.classList.add("loginShiftLeft")
    }
  }

  return (
    <>

      <div className="w-screen flex items-center justify-center min-h-screen">
        <div className="md:w-1/3 w-3/4 bg-purple-800 md:h-[40vmax] h-[80vh] border border-solid rounded-3xl overflow-hidden shadow-lg shadow-black">
          <div className="grid grid-rows-1 grid-cols-2">
            <div className="text-center p-3 text-2xl text-white font-roboto cursor-default" onClick={(e)=>switchTabs(e, "login")}>
              LogIn
            </div>
            <div className="text-center p-3 text-2xl text-white font-roboto cursor-default" onClick={(e)=>switchTabs(e, "register")}>
              SignUp
            </div>
            <button
              ref={switchbtn}
              className="h-1 rounded-full border-none transition-all duration-500"
            ></button>
          </div>
          <form
            action=""
            ref={logInTab}
            onSubmit={logInSubmit}
            className="loginForm mt-16 w-full flex flex-col items-center justify-evenly transition-all duration-500"
          >
            <div className="w-full flex items-center justify-center">
              <input
                className="p-3 w-2/3 mb-5 rounded-lg border-none outline-none font-cursive text-black text-lg shadow-black shadow-md"
                type="email"
                placeholder="Email"
                value={logInEmail}
                onChange={(e) => setLogInEmail(e.target.value)}
                required
              />
            </div>
            <div className="w-full flex items-center justify-center">
              <input
                className="p-3 w-2/3 mb-5 mt-5 rounded-lg border-none outline-none font-cursive text-black text-lg shadow-black shadow-md"
                type="password"
                placeholder="Password"
                value={logInPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <Link
              to=""
              className="text-white w-full text-end mr-5 no-underline font-roboto mt-5 mb-5"
            >
              Forgot Password?
            </Link>
            <input
              type="submit"
              value="Login"
              className="p-2 ms-auto me-auto w-1/2 rounded-lg border-none mt-5 cursor-pointer bg-white text-lg font-cursive hover:bg-slate-200 hover:text-purple-800 text-purple-800 shadow-black shadow-md"
            />
          </form>
          <form
            className="signupForm mt-16 w-full flex flex-col items-center justify-evenly transition-all duration-500"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="w-full flex items-center justify-center">
              <input
                className="p-3 w-2/3 mb-5 rounded-lg border-none outline-none font-cursive text-black text-lg shadow-black shadow-md"
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="w-full flex items-center justify-center">
              <input
                className="p-3 w-2/3 mb-5 rounded-lg border-none outline-none font-cursive text-black text-lg shadow-black shadow-md"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="w-full flex items-center justify-center">
              <input
                className="p-3 w-2/3 mb-5 rounded-lg border-none outline-none font-cursive text-black text-lg shadow-black shadow-md"
                type="password"
                name="pasword"
                placeholder="Password"
                value={password}
                onChange={registerDataChange}
              />
            </div>
            <div className="w-full flex items-center justify-center">
            {/* <img src={avatarPreview} alt="Avatar Preview" className="w-10" /> */}
              <input
                className="p-3 w-1/2 rounded-lg outline-none font-cursive mt-auto mb-auto text-black text-lg shadow-black shadow-md"
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <input
              type="submit"
              value="Sign Up"
              className="p-2 ms-auto me-auto w-1/2 rounded-lg border-none mt-5 mb-5 cursor-pointer bg-white text-lg font-cursive text-purple-800 shadow-black shadow-md"
              onSubmit  ={registerSubmit}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginSignupForm;

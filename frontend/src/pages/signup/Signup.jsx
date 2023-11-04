import React, { useContext, useEffect, useState } from "react";
import signupImg from "../../../public/signup_img.jpg";
import toast, { Toaster } from "react-hot-toast";
import { signupUser } from "../../API/apiCall";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { contex } from "../../contex/ContexApi";
function Signup() {
  const { loader, setLoader, setIsSignup } = useContext(contex);
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState({
    name: "",
    email: "",
    password: "",
  });

  function signupForm(e) {
    e.preventDefault();
    fetchSignupData();
  }

  async function fetchSignupData() {
    const { name, email, password } = inputVal;

    if (!name || !email || !password) {
      toast.error("All fields are required");
    } else if (!email.includes("@" && ".")) {
      toast.error("Please enter valid email");
    } else {
      setLoader(true);
      const serverData = await signupUser(inputVal);
      console.log(serverData);
      if (serverData.message === "Network Error") {
        toast.error("Internal Server error");
        setLoader(false);
      }
      if (serverData.status === 200) {
        setInputVal({
          name: "",
          email: "",
          password: "",
        });
        setLoader(false);
        setIsSignup(true);
        navigate("/login");
      } else {
        toast.error(serverData.response.data.error);
        setLoader(false);
      }
    }
  }

  function handlerChange(e) {
    const { name, value } = e.target;

    setInputVal({ ...inputVal, [name]: value });
  }

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="shadow-lg shadow-gray-400 rounded-lg">
        <h2 className="text-center py-2 text-2xl font-bold">Signup</h2>
        <div className="w-[80vw] flex items-center justify-between p-4">
          <div className="hidden md:block">
            <img className="w-[400px]" src={signupImg} alt="" />
          </div>
          <form className="flex flex-col items-center gap-4">
            <div className="flex flex-col ">
              <label htmlFor="name">Name</label>
              <input
                className="md:w-[35vw] w-[70vw] border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                type="text"
                placeholder="enter name"
                id="name"
                name="name"
                value={inputVal.name}
                onChange={(e) => handlerChange(e)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                className="md:w-[35vw] w-[70vw] border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                type="email"
                placeholder="enter email"
                id="email"
                name="email"
                value={inputVal.email}
                onChange={(e) => handlerChange(e)}
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="pass">Password</label>
              <input
                className="md:w-[35vw] w-[70vw] border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                type="password"
                placeholder="enter password"
                id="pss"
                name="password"
                value={inputVal.password}
                onChange={(e) => handlerChange(e)}
              />
            </div>
            <button
              onClick={(e) => signupForm(e)}
              className="flex bg-blue-500 py-1 px-3 rounded-lg text-white text-lg hover:shadow-md"
            >
              {loader ? <Loader /> : "Signup"}
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Signup;

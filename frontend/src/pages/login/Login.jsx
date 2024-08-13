import React, { useState, useContext, useEffect } from "react";
import loginImg from "../../../public/login_img.png";
import toast from "react-hot-toast";
import { contex } from "../../contex/ContexApi";
import { loginUser } from "../../API/apiCall";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const { loader, setLoader, setIsSignup, isSignup, setIsLogin } =
    useContext(contex);

  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isSignup === true) {
      toast.success("user signup successfully👍");
      setTimeout(() => setIsSignup(false), 600);
    }
  }, []);

  async function loginForm(e) {
    e.preventDefault();
    const { email, password } = inputVal;

    if (!email || !password) {
      toast.error("All fields are required 😒");
    } else if (!email.includes("." && "@")) {
      toast.error("please enter valid email ⚠️");
    } else {
      setLoader(true);
      const serverData = await loginUser(inputVal);
      console.log(serverData);
      if (serverData.message === "Network Error") {
        toast.error("Internal Server error");
        setLoader(false);
      }
      if (serverData.status === 200) {
        setInputVal({
          email: "",
          password: "",
        });
        localStorage.setItem("auth-token", serverData.data.jwt_token);
        setLoader(false);
        setIsLogin(true);
        navigate("/");
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
        <h2 className="text-center py-2 text-2xl font-bold">Login</h2>
        <div className="w-[80vw] flex items-center justify-between p-4">
          <div className="hidden md:block">
            <img className="w-[350px]" src={loginImg} alt="" />
          </div>
          <form className="flex flex-col items-center gap-5">
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
              onClick={(e) => loginForm(e)}
              className="bg-blue-500 py-1 px-6 rounded-lg text-white text-lg hover:shadow-md"
            >
              {loader ? <Loader /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

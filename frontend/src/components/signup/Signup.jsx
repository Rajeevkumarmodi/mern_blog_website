import React, { useState } from "react";
import signupImg from "../../../public/signup_img.jpg";

function Signup() {
  const [inputVal, setInputVal] = useState({
    name: "",
    email: "",
    password: "",
  });

  function signupForm(e) {
    e.preventDefault();
    console.log(inputVal);
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
              className="bg-blue-500 py-1 px-3 rounded-lg text-white text-lg hover:shadow-md"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

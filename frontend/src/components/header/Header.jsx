import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { contex } from "../../contex/ContexApi";

function Header() {
  const { setIsOpenManu, isOpenManu, isPresentToken, setIsPresentToken } =
    useContext(contex);
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      setIsPresentToken(true);
    } else {
      setIsPresentToken(false);
    }
  }, [isPresentToken]);

  function logoutFun() {
    localStorage.removeItem("auth-token");
    navigate("/login");
  }

  return (
    <div className=" flex justify-between items-center max-w-7xl bg-blue-600 py-2 px-3 md:px-10 fixed w-full z-10 ">
      <div className="flex text-2xl md:text-3xl font-bold">
        <span className="text-orange-600">Blog</span>
        <span className="text-green-500">App</span>
      </div>
      <div className="flex gap-5 items-center">
        {/* large display */}
        {isPresentToken ? (
          <div onClick={logoutFun} className="flex gap-7 items-center">
            <Link className="text-white hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400">
              Logout
            </Link>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/signup"
              className="text-white hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400"
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="text-white hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400"
            >
              login
            </Link>
          </div>
        )}
        <div className="md:hidden">
          {isOpenManu ? (
            <MdOutlineClose
              onClick={() => setIsOpenManu(!isOpenManu)}
              className=" text-white text-3xl cursor-pointer"
            />
          ) : (
            <FaBars
              onClick={() => setIsOpenManu(!isOpenManu)}
              className=" text-white text-3xl cursor-pointer "
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

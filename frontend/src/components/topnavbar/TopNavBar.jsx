import React, { useContext, useState } from "react";
import { contex } from "../../contex/ContexApi";
import { NavLink, useNavigate } from "react-router-dom";
import { FcBusinessman, FcHome } from "react-icons/fc";
import { FaBlogger, FaCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { MdAddCircle } from "react-icons/md";
import "../../../src/index.css";

function TopNavBar() {
  const { isOpenManu } = useContext(contex);
  const { blogCategories } = useContext(contex);
  const navigate = useNavigate();
  function logoutFun() {
    localStorage.removeItem("auth-token");
    navigate("/login");
  }

  return (
    <>
      {isOpenManu ? (
        <div className="mt-[50px] py-2 flex flex-col justify-center items-center gap-4  w-[300px] h-[calc(100vh-53px)] bg-[#286082] absolute right-0 z-10">
          <div className="flex items-center gap-3">
            <FcHome className="text-3xl shadow-md shadow-orange-500 bg-white rounded-full p-[1px]" />
            <NavLink
              to="/"
              className="text-white hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400 "
            >
              Home
            </NavLink>
          </div>
          <div className="flex items-center gap-3 ml-8">
            <MdAddCircle className="text-3xl shadow-md shadow-orange-500 bg-white rounded-full p-[1px]" />
            <NavLink
              to="/creatblog"
              className="text-white hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400 "
            >
              Creat Blog
            </NavLink>
          </div>
          <div className="flex items-center gap-3 mr-2">
            <FcBusinessman className="text-3xl shadow-md shadow-orange-500 bg-white rounded-full p-[1px]" />
            <NavLink
              to="/profile"
              className="text-white hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400 "
            >
              Profile
            </NavLink>
          </div>
          <div className="flex items-center gap-3 ml-5">
            <FcBusinessman className="text-3xl shadow-md shadow-orange-500 bg-white rounded-full p-[1px]" />
            <NavLink
              to="/myblogs"
              className="text-white hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400 "
            >
              My Blogs
            </NavLink>
          </div>
          <div className="flex items-center gap-3 ml-3">
            <FaBlogger className="text-3xl shadow-md shadow-orange-500 bg-white rounded-full p-[1px]" />
            <NavLink
              to="/"
              className="text-white hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400 "
            >
              All Blogs
            </NavLink>
          </div>
          <div onClick={logoutFun} className="flex items-center gap-3 ml-1">
            <TbLogout className="text-3xl shadow-md shadow-orange-500 bg-white rounded-full p-[1px]" />
            <div className="flex items-center gap-3 text-white hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400">
              Logout
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default TopNavBar;

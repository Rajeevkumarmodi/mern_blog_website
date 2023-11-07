import React, { useContext, useState } from "react";
import { contex } from "../../contex/ContexApi";
import { Link } from "react-router-dom";
import { FcBusinessman, FcHome } from "react-icons/fc";
import { FaBlogger, FaCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { MdAddCircle } from "react-icons/md";

function SideBar() {
  const [clicked, setClicked] = useState("home");
  const { blogCategories } = useContext(contex);
  return (
    <div className="mt-[52px] py-2 flex flex-col justify-center items-center gap-4  w-[300px] h-[calc(100vh-53px)] bg-[#286082]">
      <div className="flex items-center gap-3">
        <FcHome className="text-3xl shadow-md shadow-orange-500 bg-white rounded-full p-[1px]" />
        <Link
          onClick={() => setClicked("home")}
          to="/"
          className={`text-white ${
            clicked === "home" ? "bg-orange-500" : ""
          } hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400 `}
        >
          Home
        </Link>
      </div>
      <div className="flex items-center gap-3 ml-8">
        <MdAddCircle className="text-3xl shadow-md shadow-orange-500 bg-white rounded-full p-[1px]" />
        <Link
          onClick={() => setClicked("creat_blog")}
          to="/creatblog"
          className={`text-white ${
            clicked === "creat_blog" ? "bg-orange-500" : ""
          } hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400 `}
        >
          Creat Blog
        </Link>
      </div>
      <div className="flex items-center gap-3 mr-2">
        <FcBusinessman className="text-3xl shadow-md shadow-orange-500 bg-white rounded-full p-[1px]" />
        <Link
          onClick={() => setClicked("profile")}
          to="/profile"
          className={`text-white ${
            clicked === "profile" ? "bg-orange-500" : ""
          } hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400 `}
        >
          Profile
        </Link>
      </div>
      <div className="flex items-center gap-3 ml-5">
        <FcBusinessman className="text-3xl shadow-md shadow-orange-500 bg-white rounded-full p-[1px]" />
        <Link
          onClick={() => setClicked("my_blogs")}
          to="/myblogs"
          className={`text-white ${
            clicked === "my_blogs" ? "bg-orange-500" : ""
          } hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400 `}
        >
          My Blogs
        </Link>
      </div>
      <div className="flex items-center gap-3 ml-3">
        <FaBlogger className="text-3xl shadow-md shadow-orange-500 bg-white rounded-full p-[1px]" />
        <Link
          onClick={() => setClicked("all_blogs")}
          to="/"
          className={`text-white ${
            clicked === "all_blogs" ? "bg-orange-500" : ""
          } hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400 `}
        >
          All Blogs
        </Link>
      </div>
      <div className="flex items-center gap-3 ml-1">
        <TbLogout className="text-3xl shadow-md shadow-orange-500 bg-white rounded-full p-[1px]" />
        <Link className="flex items-center gap-3 text-white hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400">
          Logout
        </Link>
      </div>
    </div>
  );
}

export default SideBar;

import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className=" flex justify-between items-center max-w-7xl bg-blue-600 py-2 px-3 md:px-10 ">
      <div className="flex text-2xl md:text-3xl font-bold">
        <span className="text-orange-600">Blog</span>
        <span className="text-green-500">App</span>
      </div>
      <div className="flex gap-7">
        <Link
          to="/"
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
    </div>
  );
}

export default Header;

import React from "react";
import { Link } from "react-router-dom";

function PageNotFoundPage() {
  return (
    <div className=" pt-[100px] gap-8 flex flex-col items-center">
      <div className="text-7xl text-gray-400">😒</div>
      <div className="flex flex-col items-center gap-3">
        <p className="font-bold text-4xl">4😥4</p>
        <p className=" font-bold text-xl">PAGE NOT FOUND</p>
      </div>
      <div>
        <Link
          to="/login"
          className=" bg-blue-500 text-white px-3 rounded-lg text-xl py-1"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default PageNotFoundPage;

import React from "react";
import loginImg from "../../../public/signup_img.jpg";

function Card() {
  return (
    <div className="max-w-2xl mx-auto shadow-lg shadow-gray-400">
      <div className="bg-white border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="text-center">
          <img className="rounded-t-lg h-[260px]" src={loginImg} alt="" />
        </div>
        <div className="p-5">
          <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
          </p>
          <button
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-80 font-medium rounded-lg text-sm px-3 py-2 text-center"
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;

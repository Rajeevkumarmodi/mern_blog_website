import React from "react";

function Comment() {
  return (
    <div className="flex items-center gap-3 mb-1">
      <div>
        <p className=" w-10 h-10 rounded-full shadow-md shadow-gray-300 font-bold text-2xl flex items-center justify-center ">
          R
        </p>
      </div>
      <div className="bg-gray-300 px-3 py-1 rounded-lg">
        <p className="font-bold text-lg">Rajeev</p>
        <p>Nice blog</p>
      </div>
    </div>
  );
}

export default Comment;

import React from "react";

function Comment({ commentText, commentBy, date }) {
  return (
    <div className="flex items-center gap-3 mb-1">
      <div>
        <p className=" w-10 h-10 rounded-full shadow-md shadow-gray-300 font-bold text-2xl flex items-center justify-center ">
          {commentBy.charAt(0).toUpperCase()}
        </p>
      </div>
      <div className="bg-gray-300 px-3 py-1 rounded-lg">
        <div className="flex gap-2 items-center">
          <p className="font-bold text-lg">{commentBy}</p>{" "}
          <p className="text-gray-600 text-xs">{date.split("T")[0]}</p>
        </div>
        <p>{commentText}</p>
      </div>
    </div>
  );
}

export default Comment;

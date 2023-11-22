import React from "react";
import { RxAvatar } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const BLOGIMAGE_BASE_URL = "http://localhost:8080";
function Card({ blog, author }) {
  const { title, description } = blog && blog;
  const replaceDesc =
    blog && description.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ");

  return (
    <div
      to={`/blog/${blog._id}`}
      className="max-w-2xl m-auto shadow-lg shadow-gray-400"
    >
      <div className="bg-white border border-gray-200 rounded-lg max-w-sm relative dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/blog/${blog._id}`} className="text-center">
          <img
            className="rounded-t-lg h-[260px] "
            src={`${BLOGIMAGE_BASE_URL}/blogImage/${blog.blogImage}`}
            alt=""
          />
        </Link>
        <div className="absolute top-4 right-3 flex flex-col gap-2">
          <Link to={`/editblog/${blog._id}`}>
            <FaEdit className="text-3xl cursor-pointer hover:scale-110 duration-300 text-green-800 " />
          </Link>
          <MdDelete className="text-3xl cursor-pointer hover:scale-110 duration-300 text-red-600 " />
        </div>
        <div className="px-5 py-3 pb-5">
          <div className="text-white pb-3  flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <RxAvatar className="text-3xl" />
              <p className="font-bold">{author}</p>
            </div>
            <p>{blog && blog.createdAt.split("T")[0]}</p>
          </div>
          <h5 className=" font-bold text-2xl tracking-tight mb-2 text-white">
            {blog && title.length > 30 ? `${title.slice(0, 30)}...` : title}
          </h5>
          <div className="text-gray-300 pb-3 ">
            {replaceDesc && replaceDesc.length > 100
              ? `${replaceDesc.slice(0, 100)}...`
              : replaceDesc}
          </div>
          <Link
            to={`/blog/${blog._id}`}
            className="text-white bg-blue-700 hover:bg-blue-80 font-medium rounded-lg text-sm px-3 py-2 text-center"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;

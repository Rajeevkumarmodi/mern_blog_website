import React from "react";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";

const BLOGIMAGE_BASE_URL = "https://mern-blog-website-api.vercel.app";
function Card({ blog }) {
  const { title, description } = blog && blog;
  const replaceDesc = blog && description.replace(/<[^>]+>/g, "");

  return (
    <Link
      to={`/blog/${blog._id}`}
      className="max-w-2xl m-auto shadow-lg shadow-gray-400"
    >
      <div className="bg-white border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="text-center">
          <img
            className="rounded-t-lg h-[260px] "
            src={`${BLOGIMAGE_BASE_URL}/blogImage/${blog.blogImage}`}
            alt=""
          />
        </div>
        <div className="px-5 py-3 pb-5">
          <div className="text-white pb-3  flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <RxAvatar className="text-3xl" />
              <p className="font-bold">{blog && blog.author.name}</p>
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
          <button className="text-white bg-blue-700 hover:bg-blue-80 font-medium rounded-lg text-sm px-3 py-2 text-center">
            Read more
          </button>
        </div>
      </div>
    </Link>
  );
}

export default Card;

import React from "react";
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

function Card({ blog }) {
  const { title, description } = blog && blog;
  const replaceDesc = blog && description.replace(/<[^>]+>/g, "");
  const navigate = useNavigate();
  return (
    <div className="w-[350px] h-[400px] rounded-md shadow-lg shadow-gray-400 overflow-hidden">
      <div className="bg-gray-100 border border-gray-200 rounded-lg max-w-sm ">
        <div className="text-center ">
          <img
            onClick={() => navigate(`/blog/${blog._id}`)}
            className="rounded-t-lg h-[30vh] w-full  object-center cursor-pointer"
            src={blog.blogImage}
            alt="blog image"
          />
        </div>
        <div className="px-5 py-3 pb-5 h-[40vh]">
          <div className="text-black pb-3  flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <RxAvatar className="text-3xl" />
              <p className="font-bold">{blog && blog.author.name}</p>
            </div>
            <p>{blog && blog.createdAt.split("T")[0]}</p>
          </div>
          <h5 className=" font-bold text-2xl tracking-tight mb-2 text-black">
            {blog && title.length > 20 ? `${title.slice(0, 20)}...` : title}
          </h5>
          <div className="text-gray-700 pb-3 ">
            {replaceDesc && replaceDesc.length > 80
              ? `${replaceDesc.slice(0, 80)}...`
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

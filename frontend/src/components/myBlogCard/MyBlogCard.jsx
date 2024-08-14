import React from "react";
import { RxAvatar } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Image_not_found from "../../assets/Image-not-found.png";

function Card({ blog, author, deleteFunction }) {
  const { title, description } = blog && blog;
  const replaceDesc =
    blog && description.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ");

  async function deleteBlog(id) {
    deleteFunction(id);
  }

  return (
    <div className="mt-10 w-[330px] h-[400px] overflow-hidden m-auto shadow-lg rounded-md shadow-gray-400">
      <div className="bg-gray-100  border border-gray-200  relative">
        <Link to={`/blog/${blog._id}`} className="text-center">
          <img
            className="rounded-t-lg w-full object-cover h-[30vh] "
            src={blog.blogImage ? blog.blogImage : Image_not_found}
            alt="blog image"
          />
        </Link>
        <div className="absolute top-4 right-3 flex flex-col gap-2">
          <Link to={`/editblog/${blog._id}`}>
            <FaEdit className="text-3xl cursor-pointer hover:scale-110 duration-300 text-green-800 " />
          </Link>
          <MdDelete
            onClick={(e) => deleteBlog(blog._id)}
            className="text-3xl cursor-pointer hover:scale-110 duration-300 text-red-600 "
          />
        </div>
        <div className="px-5 h-[50vh] py-3 pb-5">
          <div className="text-gray-800 pb-3  flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <RxAvatar className="text-3xl" />
              <p className="font-bold">{author}</p>
            </div>
            <p>{blog && blog.createdAt.split("T")[0]}</p>
          </div>
          <h5 className=" font-bold text-2xl tracking-tight mb-2 text-gray-800">
            {blog && title.length > 20 ? `${title.slice(0, 20)}...` : title}
          </h5>
          <div className="text-gray-800 pb-3 ">
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

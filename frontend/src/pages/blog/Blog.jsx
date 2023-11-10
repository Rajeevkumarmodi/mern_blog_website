import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleBlog, userLikeBlog, userUnlikeBlog } from "../../API/apiCall";
import { contex } from "../../contex/ContexApi";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/Layout";
import loginImg from "../../../public/login_img.png";
import { RxAvatar } from "react-icons/rx";
import { AiFillHeart, AiTwotoneHeart } from "react-icons/ai";
import ReactHtmlParser from "react-html-parser";
const BLOGIMAGE_BASE_URL = "http://localhost:8080/blogImage";

// header
const header = {
  "Content-Type": "application/json",
  auth_token: localStorage.getItem("auth-token"),
};

function Blog() {
  const { loader, setLoader } = useContext(contex);
  const [isLiked, setIsLiked] = useState(false);
  const [blogData, setBlogData] = useState();
  const { id } = useParams();
  useEffect(() => {
    fetchSingleBlog();
  }, [id]);

  // blog description
  const blogDescription = blogData && ReactHtmlParser(blogData.description);

  // fetchsingle blog function

  async function fetchSingleBlog() {
    setLoader(true);
    const serverData = await singleBlog(id, header);
    console.log(serverData);
    if (serverData.status === 200) {
      setLoader(false);
      setBlogData(serverData.data.success);
    } else {
      setLoader(false);
      toast.error(serverData.response.data.error);
    }
  }

  // user like blog function

  async function userLikeBlogFun() {
    const serverData = await userLikeBlog(id, header);
    if (serverData.status === 200) {
      const serverData = await singleBlog(id, header);
      setBlogData(serverData.data.success);
    }
    console.log("like call", serverData);
    if (serverData.message == "Network Error") {
      toast.error("Internal server error");
    }
  }

  // user unlike blog function

  async function userUnlikeBlogFun() {
    const serverData = await userUnlikeBlog(id, header);
    console.log("unlike call", serverData);
    if (serverData.status === 200) {
      const serverData = await singleBlog(id, header);
      setBlogData(serverData.data.success);
    }
    if (serverData.message == "Network Error") {
      toast.error("Internal server error");
    }
  }

  return (
    <Layout>
      <div className="mt-[70px] md:w-[60vw] w-[80vw]">
        {loader ? (
          <Loader />
        ) : (
          <div className=" shadow-lg shadow-gray-400 rounded-lg p-5">
            <div>
              <img
                className="w-full h-[40vh] md:h-[50vh]"
                src={blogData && BLOGIMAGE_BASE_URL + "/" + blogData.blogImage}
                alt=""
              />
            </div>
            <div className="flex items-center gap-1">
              {blogData && blogData.likes.includes(blogData.author._id) ? (
                <AiTwotoneHeart
                  onClick={userUnlikeBlogFun}
                  className="text-4xl cursor-pointer hover:shadow-md shadow-gray-400 rounded-full text-red-700"
                />
              ) : (
                <AiFillHeart
                  onClick={userLikeBlogFun}
                  className="text-4xl cursor-pointer hover:shadow-md shadow-gray-400 rounded-full text-gray-500"
                />
              )}

              <p>{blogData && blogData.likes.length}</p>
            </div>
            <div className="py-3 flex items-center justify-between">
              <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                <RxAvatar className=" md:text-4xl text-3xl" />
                <p className="md:text-xl text-base font-bold">
                  {blogData && blogData.author.name}
                </p>
              </div>
              <p className="font-bold">
                {blogData && blogData.createdAt.split("T")[0]}
              </p>
            </div>
            {/* blog title */}
            <div>
              <h2 className="text-xl font-bold py-2">
                {blogData && blogData.title}
              </h2>
            </div>
            <div className="text-gray-600">{blogDescription}</div>
          </div>
        )}
      </div>
      <Toaster />
    </Layout>
  );
}

export default Blog;

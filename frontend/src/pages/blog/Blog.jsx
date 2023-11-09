import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleBlog } from "../../API/apiCall";
import { contex } from "../../contex/ContexApi";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/Layout";
import loginImg from "../../../public/login_img.png";
import { RxAvatar } from "react-icons/rx";
import { AiFillHeart } from "react-icons/ai";
import ReactHtmlParser from "react-html-parser";
const BLOGIMAGE_BASE_URL = "http://localhost:8080/blogImage";
function Blog() {
  const { loader, setLoader } = useContext(contex);
  const [isLiked, setIsLiked] = useState(false);
  const [blogData, setBlogData] = useState();
  //   const [blogImage, setBlogImage] = useState();
  const { id } = useParams();
  useEffect(() => {
    fetchSingleBlog();
  }, [id]);

  const blogDescription = blogData && ReactHtmlParser(blogData.description);
  async function fetchSingleBlog() {
    const header = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem("auth-token"),
    };
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
              <AiFillHeart
                onClick={() => setIsLiked(!isLiked)}
                className={`text-4xl cursor-pointer hover:shadow-md shadow-gray-400 rounded-full ${
                  isLiked ? "text-red-600" : "text-gray-500"
                }`}
              />
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
      {console.log(blogData)}
      <Toaster />
    </Layout>
  );
}

export default Blog;

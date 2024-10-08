import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  singleBlog,
  userLikeBlog,
  userUnlikeBlog,
  userComment,
} from "../../API/apiCall";
import { contex } from "../../contex/ContexApi";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/Layout";
import Comment from "../../components/comment/Comment";
import { RxAvatar } from "react-icons/rx";
import { AiFillHeart, AiTwotoneHeart, AiOutlineSend } from "react-icons/ai";
const BLOGIMAGE_BASE_URL = "https://mern-blog-website-api.vercel.app/blogImage";

// header
const header = {
  "Content-Type": "application/json",
  auth_token: localStorage.getItem("auth-token"),
};

function Blog() {
  const { loader, setLoader } = useContext(contex);
  const [isLiked, setIsLiked] = useState(false);
  const [blogData, setBlogData] = useState();
  const [comment, setComment] = useState("");
  const [totalComment, setTotalComment] = useState([]);
  const [likeUnlikeProcess, setLikeUnlikeProcess] = useState(false);
  const [commentSendLoding, setCommentSendLoding] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    fetchSingleBlog();
  }, [id]);

  // fetchsingle blog function

  async function fetchSingleBlog() {
    setLoader(true);
    const serverData = await singleBlog(id, header);
    console.log(serverData);
    if (serverData.status === 200) {
      setLoader(false);
      setBlogData(serverData.data.success);
      setTotalComment(serverData.data.success.comments);
    } else if (serverData.response.data.error.name === "TokenExpiredError") {
      localStorage.removeItem("auth-token");
      setLoader(false);
      navigate("/login");
    } else {
      setLoader(false);
      toast.error(serverData.response.data.error);
    }
  }

  // user like blog function

  async function userLikeBlogFun() {
    setLikeUnlikeProcess(true);
    const serverData = await userLikeBlog(id, header);
    if (serverData.status === 200) {
      const serverData = await singleBlog(id, header);
      setBlogData(serverData.data.success);
    }
    console.log("like call", serverData);
    if (serverData.message == "Network Error") {
      toast.error("Internal server error");
    }
    setLikeUnlikeProcess(false);
  }

  // user unlike blog function

  async function userUnlikeBlogFun() {
    setLikeUnlikeProcess(true);
    const serverData = await userUnlikeBlog(id, header);
    console.log("unlike call", serverData);
    if (serverData.status === 200) {
      const serverData = await singleBlog(id, header);
      setBlogData(serverData.data.success);
    }
    if (serverData.message == "Network Error") {
      toast.error("Internal server error");
    }
    setLikeUnlikeProcess(false);
  }

  async function commentAPICallFun() {
    if (!comment) {
      toast.error("Please fill comment");
    } else {
      setCommentSendLoding(true);
      const serverData = await userComment(id, header, { comment: comment });
      // console.log(serverData);
      if (serverData.status === 200) {
        setCommentSendLoding(false);
        const serverData = await singleBlog(id, header);
        setBlogData(serverData.data.success);
        setTotalComment(serverData.data.success.comments);
        setComment("");
      }
      if (serverData.message == "Network Error") {
        setCommentSendLoding(false);
        toast.error("Internal server error");
      }
    }
  }

  return (
    <Layout>
      <div className="mt-[70px] md:w-[60vw] w-[80vw]">
        {loader ? (
          <Loader />
        ) : (
          <div className=" shadow-lg shadow-gray-400 rounded-lg p-5">
            <div className="h-[40vh] md:h-[50vh] overflow-hidden">
              <img
                className="w-full h-full object-contain"
                src={blogData && blogData.blogImage}
                alt=""
              />
            </div>
            <div className="flex items-center gap-1 mt-3">
              {blogData && blogData.likes.includes(blogData.author._id) ? (
                <button
                  disabled={likeUnlikeProcess}
                  onClick={userUnlikeBlogFun}
                >
                  {likeUnlikeProcess ? (
                    <div className="w-[100px] my-2">
                      <Loader />
                    </div>
                  ) : (
                    <AiTwotoneHeart className="text-4xl cursor-pointer hover:shadow-md shadow-gray-400 rounded-full text-red-700" />
                  )}
                </button>
              ) : (
                <button disabled={likeUnlikeProcess} onClick={userLikeBlogFun}>
                  {likeUnlikeProcess ? (
                    <div className="w-[100px] my-2">
                      <Loader />
                    </div>
                  ) : (
                    <AiFillHeart className="text-4xl cursor-pointer hover:shadow-md shadow-gray-400 rounded-full text-gray-500" />
                  )}
                </button>
              )}

              {!likeUnlikeProcess && <p>{blogData && blogData.likes.length}</p>}
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
            <div
              className="text-gray-600 overflow-x-hidden "
              dangerouslySetInnerHTML={{
                __html: blogData && blogData.description,
              }}
            ></div>

            {/* comment */}

            <div className="flex items-center gap-2  mt-5 mb-3">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border-2 border-gray-400 rounded-lg px-2 py-1"
                placeholder={`comment as ${blogData && blogData.author.name}`}
              />
              {commentSendLoding ? (
                <Loader />
              ) : (
                <button disabled={comment.length > 0 ? false : true}>
                  <AiOutlineSend
                    onClick={() => commentAPICallFun()}
                    className={`text-3xl ${
                      comment.length > 0 ? "text-green-500" : "text-gray-500"
                    } `}
                  />
                </button>
              )}
            </div>

            {totalComment && totalComment.length > 0 ? (
              <div className="flex flex-col gap-2">
                <p>comments</p>
                {totalComment &&
                  totalComment.map((comment) => {
                    return (
                      <Comment
                        commentText={comment.commentText}
                        commentBy={comment.commentBy.name}
                        date={comment.createdAt}
                      />
                    );
                  })}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Blog;

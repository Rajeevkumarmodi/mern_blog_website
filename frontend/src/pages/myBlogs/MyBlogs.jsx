import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { contex } from "../../contex/ContexApi";
import toast from "react-hot-toast";
import { userBlogs } from "../../API/apiCall";
import MyBlogCard from "../../components/myBlogCard/MyBlogCard";
import Loader from "../../components/loader/Loader";
import { deleteSingleBlog } from "../../API/apiCall";

function UserHome() {
  const { blogCategories, loader, setLoader } = useContext(contex);
  const [allBlogs, setAllBlogs] = useState();

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    const header = {
      "Content-Type": "multipart/form-data",
      auth_token: localStorage.getItem("auth-token"),
    };

    setLoader(true);
    const serverData = await userBlogs(header);
    console.log(serverData);
    if (serverData.message === "Network Error") {
      setLoader(false);
      toast.error("Internal Server Error");
    } else {
      setAllBlogs(serverData.data.success);
      setLoader(false);
    }
  }

  // header
  const header = {
    "Content-Type": "application/json",
    auth_token: localStorage.getItem("auth-token"),
  };

  async function deleteFunction(id) {
    const serverData = await deleteSingleBlog(id, header);
    console.log(serverData);
    if (serverData.status === 200) {
      toast.success("Blog deleted ");
      fetchBlogs();
    } else if (serverData.response.data.error.name === "TokenExpiredError") {
      localStorage.removeItem("auth-token");
      setLoader(false);
      navigate("/login");
    } else {
      toast.error(serverData.response.data.error);
    }
  }

  console.log(allBlogs);

  return (
    <Layout>
      <div className="my-[60px] flex  flex-col">
        <h2 className="text-center font-bold  mt-2 mb-4 text-2xl underline text-orange-600">
          My All Blogs
        </h2>
        {loader ? (
          <Loader />
        ) : allBlogs ? (
          <div className="flex  flex-wrap  ">
            {allBlogs.blogs.length === 0 ? (
              <div className="text-2xl font-bold">Blog not found</div>
            ) : (
              allBlogs.blogs.map((blog) => {
                return (
                  <MyBlogCard
                    key={blog._id}
                    blog={blog}
                    author={allBlogs.name}
                    deleteFunction={deleteFunction}
                  />
                );
              })
            )}
          </div>
        ) : (
          <h2 className="text-2xl font-bold text-center ">Blogs not found😒</h2>
        )}
      </div>
    </Layout>
  );
}

export default UserHome;
